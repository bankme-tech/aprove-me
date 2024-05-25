import { Controller } from '@nestjs/common';
import { MicroservicesService } from './microservices.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class MicroservicesController {
  constructor(private readonly microservicesService: MicroservicesService) {}

  @MessagePattern('payable_queue')
  async getPayableNotifications(@Ctx() data: RmqContext) {
    const channel = data.getChannelRef();
    const message = data.getMessage();
    const payablesToCreate = JSON.parse(message.content.toString());

    await this.microservicesService.handlePayableQueue(payablesToCreate);

    channel.ack(message);

    return 'Payables created';
  }
}
