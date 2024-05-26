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

@Controller()
export class RabbitMQConsumer implements IConsumer<BatchInputDTO, RmqContext> {
  constructor(private readonly payableService: PayableService) {}

  @MessagePattern(process.env.RABBITMQ_QUEUE)
  async consume(
    @Payload() payload: BatchInputDTO,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel: ChannelWrapper = context.getChannelRef();
    try {
      const { payables } = payload;
      await this.payableService.processBatch(payables);
      channel.ack(context.getMessage());
    } catch (error) {
      Logger.error('Error processing batch', PayableService.name);
      throw error;
    }
  }
}
