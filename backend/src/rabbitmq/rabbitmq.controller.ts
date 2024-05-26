import { Controller } from '@nestjs/common';

import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import { ConsumerService } from './consumer';
import { EmailService } from './email.service';

@Controller('rabbitmq')
export class RabbitmqController {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly emailService: EmailService,
  ) {}

  @MessagePattern('payable_queue')
  async getNotifications(@Ctx() context: RmqContext) {
    const message = context.getMessage();
    const content = JSON.parse(message.content);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pattern, ...properties } = content;
    const contentArray = Object.values(properties) as CreatePayableDto[];

    const response = await this.consumerService.consumeMessage(contentArray);

    // this.emailService.payablesInformationEmail(response);
  }
}
