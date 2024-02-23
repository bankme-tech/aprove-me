import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://admin:admin@localhost:5672/']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('test-queue', { durable: true });
      },
    });
  }

  async sendMessage(payable: CreatePayableDto) {
    try {
      await this.channelWrapper.sendToQueue('test-queue', Buffer.from(JSON.stringify(payable)), {
        persistent: true,
      });

      Logger.log(`Message sent: ${payable}`);
    } catch (error) {
      Logger.error(`Error sending message: ${error}`);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
