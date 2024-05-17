import { Controller, Get, Param } from '@nestjs/common';
import { PayableDto } from './dto/payable.dto';
import { PayableService } from './payable.service';

@Controller('integrations/payable')
export class PayableController {
  constructor(private service: PayableService) {}

  @Get()
  findAll(): Promise<PayableDto []> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param() params: any) {
    return this.service.findById(params.id)
  }
}