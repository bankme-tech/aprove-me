import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { CreatePayableDto } from 'src/payables/dto/create.payable.dto';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('payableQueue', { durable: true });
      },
    });
  }

  async addToPayableQueue(payable: CreatePayableDto[]) {
    try {
      await this.channelWrapper.sendToQueue(
        'payableQueue',
        Buffer.from(JSON.stringify(payable)),
        {
          persistent: true,
        },
      );
    } catch (error) {
      throw new HttpException(
        'Error adding payable to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
