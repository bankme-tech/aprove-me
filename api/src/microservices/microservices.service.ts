import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePayableDto } from '../payable/dto/create-payable.dto';
import { PayableService } from '../payable/payable.service';
import amq, { Channel, ChannelWrapper } from 'amqp-connection-manager';

@Injectable()
export class MicroservicesService {
  private channel: ChannelWrapper;
  constructor(private readonly payableService: PayableService) {}

  private async onModuleInit() {
    const connection = amq.connect('amqp://rabbitmq:rabbitmq@rabbitmq:5672');
    this.channel = connection.createChannel({
      json: true,
      setup: (channel: Channel) => {
        return channel.assertQueue('payable_queue', { durable: true });
      },
    });
  }

  async handlePayableQueue(payablesToCreate: CreatePayableDto[]) {
    const maxRetries = 5;
    for (const payableToCreate of payablesToCreate) {
      let statusSuccess = false;
      let retries = 0;

      while (!statusSuccess && retries < maxRetries) {
        try {
          console.log('Creating payable:', payableToCreate);
          await this.payableService.create(payableToCreate);
          statusSuccess = true;
        } catch (error) {
          console.error(
            'Error registering accounts payable, trying again:',
            error,
          );
          retries++;
        }
      }

      if (!statusSuccess) {
        await this.addPayableToDeadQueue(payableToCreate);
      }
    }
  }

  async resolvePayableQueue(payablesToResolve: CreatePayableDto[]) {
    const message = JSON.stringify({
      pattern: 'payable_queue',
      data: payablesToResolve,
    });
    try {
      await this.channel.sendToQueue('payable_queue', Buffer.from(message));
    } catch (error) {
      Logger.error('Error sending message to queue', error);
      throw new HttpException(
        'Error sending message to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result = await this.channel.addSetup((channel: Channel) => {
      return channel.consume('payable_queue', async (message) => {
        const payablesToCreate: CreatePayableDto[] = JSON.parse(
          message.content.toString(),
        );
        await this.handlePayableQueue(payablesToCreate);
        channel.ack(message);
      });
    });
    console.log('Result:', result);
  }

  private async addPayableToDeadQueue(payable: CreatePayableDto) {
    const message = JSON.stringify({
      pattern: 'dead_queue',
      data: payable,
    });
    try {
      this.channel.sendToQueue('dead_queue', Buffer.from(message));
    } catch (error) {
      Logger.error('Error sending message to dead queue', error);
      throw new HttpException(
        'Error sending message to dead queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
