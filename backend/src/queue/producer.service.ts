import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { PayableQueueMessage } from './entities/payable-queue-message.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;

  constructor(private emailService: EmailService) {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        channel.assertQueue('payableQueue', { durable: true });
        channel.assertQueue('deadLetterQueue', { durable: true });
      },
    });
  }

  async addToPayableQueue(payable: PayableQueueMessage) {
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

  async addToDeadLetterQueue(message: any) {
    try {
      await this.channelWrapper.sendToQueue(
        'deadLetterQueue',
        Buffer.from(JSON.stringify(message)),
        {
          persistent: true,
        },
      );
      this.emailService.sendEmail({
        email: 'operations@email.com',
        html: `<h1>Dead Letter Queue Alert</h1><p>Message: ${JSON.stringify(
          message,
        )}</p>`,
        subject: 'Dead Letter Queue Alert',
      });
    } catch (error) {
      throw new HttpException(
        'Error adding message to dead letter queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
