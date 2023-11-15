import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreatePayableDTO } from './dto/create-payable.dto';
import { IPayableService } from './interfaces/payable.service.interface';
import { PayableService } from './payable.service';

@Controller('integrations/payable')
export class PayableController {
  constructor(
    @Inject(PayableService) private payableService: IPayableService,
  ) {}

  @Post()
  create(@Body() payable: CreatePayableDTO): Promise<CreatePayableDTO> {
    return this.payableService.create(payable);
  }
}
