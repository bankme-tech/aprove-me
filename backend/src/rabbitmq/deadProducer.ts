import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';

@Injectable()
export class DeadProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost:5672']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('dead-queue', { durable: true });
      },
    });
  }

  async sendToDeadQueue(payables: CreatePayableDto) {
    const message = JSON.stringify({ pattern: 'dead-queue', ...payables });

    try {
      await this.channelWrapper.sendToQueue(
        'dead-queue',
        Buffer.from(message),
        {
          persistent: true,
        } as any,
      );
    } catch (error) {
      Logger.error(`Error sending message: ${error}`);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
