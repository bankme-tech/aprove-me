import { RabbitMQService } from '@infra/http/rabbitmq/rabbitmq.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PayableRepository } from '../repositories/payable.repository';
import { Payable } from '../entities/payable.entity';

@Injectable()
export class PayableConsumerService implements OnModuleInit {
  private readonly maxRetries = 4;

  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private repository: PayableRepository,
  ) {}

  async onModuleInit() {
    await this.rabbitMQService.connect();
    await this.rabbitMQService.consume(
      'payables_queue',
      this.handleMessage.bind(this),
    );
  }

  private async handleMessage(msg: any) {
    const content = JSON.parse(msg.content.toString());
    try {
      await this.repository.create({
        value: content.value,
        emissionDate: new Date(content.emissionDate),
        assignorId: content.assignorId,
      } as any);
      this.rabbitMQService.ack(msg);
    } catch (error) {
      const retryCount = (msg.properties.headers['x-death'] || []).length;

      if (retryCount >= this.maxRetries) {
        await this.rabbitMQService.sendToQueue('payables_dead_letter', content);
        this.rabbitMQService.ack(msg);
        // this.sendFailureEmail(content);
      } else {
        this.rabbitMQService.nack(msg, true);
      }
    }
  }

  private async sendFailureEmail(payable: any) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'random@gmail.com',
        pass: 'senhasecreta',
      },
    });

    await transporter.sendMail({
      from: 'random@gmail.com',
      to: 'random12@gmail.com',
      subject: 'Failed to Process Payable',
      text: `Failed to process payable with ID: ${payable.id} after ${this.maxRetries} attempts.`,
    });
  }
}
