import { Controller, Get } from '@nestjs/common';
import { PayableConsumerService } from './payable-consumer.service';

@Controller()
export class PayableConsumerController {
  constructor(
    private readonly payableConsumerService: PayableConsumerService,
  ) {}

  @Get()
  getHello(): string {
    return this.payableConsumerService.getHello();
  }
}
