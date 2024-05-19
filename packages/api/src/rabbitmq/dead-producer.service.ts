import { constants } from '@configs/constants';
import { CreatePayableDto } from '@payable/dto/create-payable.dto';
import amqp, { Channel, ChannelWrapper } from 'amqp-connection-manager';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class DeadProducerService {
  private channelWrapper: ChannelWrapper;
  private readonly deadQueueName = 'dead-queue';
  private readonly rabbitmqUrl = constants.RmqUrl;

  constructor() {
    const connection = amqp.connect([this.rabbitmqUrl]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(this.deadQueueName);
      },
    });
  }

  async sendToDeadQueue(payables: CreatePayableDto) {
    const message = JSON.stringify({ pattern: this.deadQueueName, ...payables });

    try {
      await this.channelWrapper.sendToQueue(this.deadQueueName, Buffer.from(message), { persistent: true });
    } catch (error) {
      Logger.error(`error sending message to dead-queue: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
