import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { CreatePayableDto } from '../payable/dto/create-payable.dto';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://rabbitmq:rabbitmq@rabbitmq:5672']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('payable_queue', { durable: true });
      },
    });
  }

  async addPayableToQueue(payables: CreatePayableDto[]) {
    try {
      const message = JSON.stringify({
        pattern: 'payable-queue',
        payables: payables,
      });
      await this.channelWrapper.sendToQueue(
        'payable_queue',
        Buffer.from(message),
        {
          persistent: true,
        } as any,
      );
      Logger.log('Sent To Queue');
    } catch (error) {
      console.log('Error sending payable to queue', error);

      throw new HttpException(
        'Error sending payable to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
