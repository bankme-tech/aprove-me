import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import { PAYABLE_QUEUE } from './constants';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://admin:admin@rabbitmq:5672/']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(PAYABLE_QUEUE, { durable: true });
      },
    });
  }

  async sendToPayableQueue(payables: CreatePayableDto[]) {
    const message = JSON.stringify({ pattern: PAYABLE_QUEUE, ...payables });

    try {
      await this.channelWrapper.sendToQueue(
        PAYABLE_QUEUE,
        Buffer.from(message),
      );
    } catch (error) {
      Logger.error(error.message, error.stack, 'ProducerService');
      throw new InternalServerErrorException(
        'Error sending message to payable queue',
      );
    }
  }
}
