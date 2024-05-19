import { constants } from '@configs/constants';
import { CreatePayableDto } from '@payable/dto/create-payable.dto';
import amqp, { Channel, ChannelWrapper } from 'amqp-connection-manager';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  private readonly rabbitmqUrl = constants.RmqUrl;
  private readonly payableQueueName = 'payable-queue';

  constructor() {
    const connection = amqp.connect([this.rabbitmqUrl]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(this.payableQueueName);
      },
    });
  }

  async sendMessage(payables: CreatePayableDto[]) {
    const message = JSON.stringify({ pattern: this.payableQueueName, ...payables });

    try {
      await this.channelWrapper.sendToQueue(this.payableQueueName, Buffer.from(message), { persistent: true });
    } catch (error) {
      Logger.error(`error sending message to payable-queue: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
