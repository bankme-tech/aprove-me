import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost:5672']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('payable_queue', { durable: true });
      },
    });
  }

  async sendMessage(payables: CreatePayableDto[]) {
    const message = JSON.stringify({ pattern: 'payable_queue', ...payables });

    try {
      await this.channelWrapper.sendToQueue(
        'payable_queue',
        Buffer.from(message),
        {
          persistent: true,
        } as any,
      );
    } catch (error) {
      console.log('aaa');
      Logger.error(`Error sending message: ${error}`);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
