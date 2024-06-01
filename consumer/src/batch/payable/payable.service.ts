import { Injectable } from '@nestjs/common';
import PayableCreationDto from '../dto/PayableCreationDto';
import { RmqContext } from '@nestjs/microservices';
import amqp, { Channel } from 'amqp-connection-manager';
import PayableRepository from './payable.repository';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PayableService {
  private readonly maxAttempts = 3;
  private itemsReport = {};

  constructor(
    private payableRepository: PayableRepository,
    private emailService: EmailService,
  ) {}

  async processPayable(payload: PayableCreationDto, context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (!this.itemsReport[payload.batchId]) {
      this.itemsReport[payload.batchId] = {
        total: payload.total,
        successful: 0,
        failed: 0,
      };
    }

    const attempts = originalMsg.properties.headers['attempts'] || 0;

    try {
      // if (payload.value > 1250) {
      //   throw new Error('Erro no processamento de recebivel.');
      // }

      await this.payableRepository.createPayableRegister(payload.toEntity());
      channel.ack(originalMsg);
      this.itemsReport[payload.batchId].successful++;
    } catch (error) {
      if (attempts < this.maxAttempts) {
        channel.ack(originalMsg);
        this.requeueMessage(payload, attempts);
      } else {
        channel.ack(originalMsg);
        this.sendToDeadQueue(payload);
        this.itemsReport[payload.batchId].failed++;
      }
    }

    if (
      this.itemsReport[payload.batchId].successful +
        this.itemsReport[payload.batchId].failed ===
      payload.total
    ) {
      this.emailService.sendEmail(
        payload.email,
        `Lote ${payload.batchId} finalizado`,
        `<p>Sucesso: ${this.itemsReport[payload.batchId].successful} , Falhas: ${this.itemsReport[payload.batchId].failed}</p>`,
      );
      delete this.itemsReport[payload.batchId];
    }
  }

  async requeueMessage(message: PayableCreationDto, attempts: number) {
    const connection = amqp.connect(['amqp://admin:admin@rabbitmq:5672/']);
    const channel = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('payable_queue', { durable: false });
      },
    });

    channel.sendToQueue(
      'payable_queue',
      Buffer.from(
        JSON.stringify({ pattern: 'payable_batch', data: { ...message } }),
      ),
      {
        persistent: true,
        headers: {
          attempts: attempts + 1,
        },
      },
    );
  }

  async sendToDeadQueue(message: PayableCreationDto) {
    const connection = amqp.connect(['amqp://admin:admin@rabbitmq:5672/']);
    const channel = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('dead_payable_queue', { durable: false });
      },
    });

    channel.sendToQueue(
      'dead_payable_queue',
      Buffer.from(
        JSON.stringify({ pattern: 'dead_payable', data: { ...message } }),
      ),
      {
        persistent: true,
      },
    );
  }
}
