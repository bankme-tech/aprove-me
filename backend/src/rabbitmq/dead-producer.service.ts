import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import { DEAD_QUEUE } from './constants';

@Injectable()
export class DeadProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://admin:admin@rabbitmq:5672/']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(DEAD_QUEUE, { durable: true });
      },
    });
  }

  async sendToDeadQueue(payables: CreatePayableDto) {
    const message = JSON.stringify({ pattern: DEAD_QUEUE, ...payables });

    try {
      await this.channelWrapper.sendToQueue(DEAD_QUEUE, Buffer.from(message));
    } catch (error) {
      Logger.error(error.message, error.stack, 'DeadProducerService');
      throw new InternalServerErrorException(
        'Error sending message to dead queue',
      );
    }
  }
}
