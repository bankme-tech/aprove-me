import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private readonly configService: ConfigService) {}

  async connect() {
    if (!this.connection) {
      this.connection = await amqp.connect(
        this.configService.get<string>('RABBITMQ_URL'),
      );
    }
    if (!this.channel) {
      console.log('Creating channel');
      this.channel = await this.connection.createChannel();
      console.log('Channel created');
      await this.setupQueues();
    }
  }

  private async deleteQueueIfExists(queueName: string) {
    try {
      await this.channel.deleteQueue(queueName);
      console.log(`Queue ${queueName} deleted successfully.`);
    } catch (error) {
      console.log(`Queue ${queueName} does not exist or could not be deleted.`);
    }
  }

  private async setupQueues() {
    console.log('Setting up queues');
    await this.deleteQueueIfExists('payables_queue');
    await this.channel.assertQueue('payables_queue', {
      durable: true,
      // arguments: {
      //   'x-dead-letter-exchange': 'longstr',
      //   'x-dead-letter-routing-key': 'payables_retry_queue',
      // },
    });
    console.log('Queue setup complete.');
  }

  private async setupQuesues() {
    console.log('Setting up queues');
    await this.channel.assertQueue('payables_queue', {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': 'longstr',
        'x-dead-letter-routing-key': 'payables_retry_queue',
      },
    });
  }

  async sendToQueue(queue: string, message: any) {
    if (!this.channel) {
      await this.connect();
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }

  async consume(queue: string, callback: (msg: amqp.ConsumeMessage) => void) {
    if (!this.channel) {
      await this.connect();
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, callback, { noAck: false });
  }

  ack(message: amqp.ConsumeMessage) {
    this.channel.ack(message);
  }

  nack(message: amqp.ConsumeMessage, requeue = false) {
    this.channel.nack(message, false, requeue);
  }
}
