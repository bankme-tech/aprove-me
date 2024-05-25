import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';

@Controller()
export class MicroServicesController {
  constructor(private readonly consumerService: ConsumerService) {}

  @MessagePattern('payable_queue')
  async getNotifications(@Ctx() context: RmqContext) {
    const message = context.getMessage();
    const content = JSON.parse(message.content);

    const { payables } = content;
    await this.consumerService.consumePayableQueue(payables);

    return { success: true };
  }
}
