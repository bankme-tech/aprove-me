import { Controller } from '@nestjs/common';
import { PayableService } from './payable.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import PayableCreationDto from '../dto/PayableCreationDto';

@Controller('payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @EventPattern('payable_batch')
  processPayable(@Payload() payload: PayableCreationDto[]) {
    return this.payableService.processPayable(payload);
  }
}
