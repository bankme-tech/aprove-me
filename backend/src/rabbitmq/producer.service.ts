import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://admin:admin@rabbitmq:5672/']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('payable-queue', { durable: true });
      },
    });
  }

  async sendMessage(payables: CreatePayableDto[]) {
    const message = JSON.stringify({ pattern: 'payable-queue', ...payables });

    try {
      await this.channelWrapper.sendToQueue('payable-queue', Buffer.from(message), {
        persistent: true,
      });
    } catch (error) {
      Logger.error(`Error sending message: ${error}`);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
