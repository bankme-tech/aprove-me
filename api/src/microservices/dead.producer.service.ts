import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { CreatePayableDto } from '../payable/dto/create-payable.dto';

@Injectable()
export class DeadProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://rabbitmq:rabbitmq@rabbitmq:5672']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('dead_queue', { durable: true });
      },
    });
  }

  async addToDeadQueue(payable: CreatePayableDto) {
    try {
      const message = JSON.stringify({
        pattern: 'dead_queue',
        payable,
      });
      await this.channelWrapper.sendToQueue(
        'dead_queue',
        Buffer.from(message),
        {
          persistent: true,
        } as any,
      );
      Logger.log('Sent To Queue');
    } catch (error) {
      Logger.error('Error sending payable to queue', error);
      throw new HttpException(
        'Error sending payable to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
