import { PayableService } from './payable.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import PayableCreationDto from '../dto/PayableCreationDto';
import { Controller } from '@nestjs/common';

@Controller()
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @EventPattern('payable_batch')
  async processPayable(
    @Payload() payload: PayableCreationDto,
    @Ctx() context: RmqContext,
  ) {
    await this.payableService.processPayable(payload, context);
    return;
  }
}
