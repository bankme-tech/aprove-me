import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { BatchInputDTO } from 'src/payable/dto/batch.input.dto';
import { PayableService } from 'src/payable/payable.service';
import { IConsumer } from './interfaces/consumer.interface';
import { ChannelWrapper } from 'amqp-connection-manager';
import { Message, MessagePropertyHeaders } from 'amqplib';

@Controller()
export class RabbitMQConsumer implements IConsumer<BatchInputDTO, RmqContext> {
  private readonly logger = new Logger(RabbitMQConsumer.name);
  private maxRetries = parseInt(process.env.RABBITMQ_MAX_RETRY_COUNT || '4');

  constructor(private readonly payableService: PayableService) {}

  @MessagePattern(process.env.RABBITMQ_QUEUE)
  async consume(
    @Payload() payload: BatchInputDTO,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel: ChannelWrapper = context.getChannelRef();
    const message = context.getMessage() as Message;
    const headers = message.properties.headers;
    const retries = parseInt(headers['x-retries']) || 0;
    const { payables } = payload;

    const failed = retries >= this.maxRetries;
    if (failed) {
      this.logger.debug(
        `Max number of retries reached for message | Number of retries: ${retries}`,
      );
      this.sendToDeadLetterQueue(retries, message, channel, headers, payload);
      this.payableService.sendNotificationEmail(payables, failed);
      return channel.ack(message);
    }

    try {
      this.logger.debug(`Received batch with ${payables.length} payables`);
      await this.payableService.processBatch(payables, retries);
      return channel.ack(message);
    } catch (error) {
      this.logger.error('Error processing batch', error.stack);
    }
  }

  private async sendToDeadLetterQueue(
    retries: number,
    message: Message,
    channel: ChannelWrapper,
    headers: MessagePropertyHeaders,
    payload: BatchInputDTO,
  ): Promise<void> {
    const payloadString = JSON.stringify(payload);
    this.logger.debug(
      `Max number of retries reached for message with payload ${payloadString} | Sending to dead letter queue '${process.env.RABBITMQ_DEAD_LETTER_QUEUE}'.`,
    );
    await channel.sendToQueue(
      process.env.RABBITMQ_DEAD_LETTER_QUEUE,
      message.content,
      {
        headers: {
          ...headers,
          'x-retries': retries + 1,
        },
      },
    );
  }
}
