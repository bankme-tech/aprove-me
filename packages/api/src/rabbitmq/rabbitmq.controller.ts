import { Controller, Logger } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class RabbitMQController {
  constructor(private readonly consumerService: ConsumerService) {}

  @MessagePattern('payable-queue')
  async getNotifications(@Ctx() context: RmqContext) {
    const message = context.getMessage();
    const content = JSON.parse(message.content);

    const { pattern, ...properties } = content;
    const contentArray = Object.values(properties) as CreatePayableDto[];

    await this.consumerService.consumeMessage(contentArray);

    Logger.log(`a new message sent to ${pattern}`);

    return { success: true };
  }
}
