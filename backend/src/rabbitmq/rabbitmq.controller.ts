import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';

@Controller()
export class RabbitMQController {
  constructor(private readonly consumerService: ConsumerService) {}

  @MessagePattern('payable-queue')
  async getNotifications(@Ctx() context: RmqContext) {
    const message = context.getMessage();
    const content = JSON.parse(message.content);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pattern, ...properties } = content;
    const contentArray = Object.values(properties) as CreatePayableDto[];

    await this.consumerService.consumeMessage(contentArray);

    return { success: true };
  }
}
