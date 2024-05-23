import { Body, Controller, Post } from '@nestjs/common';

import { PayableUsecase } from './payable.usecase';
import { CreatePayableDto } from './create-payable.dto';

@Controller('/integrations/payable')
export class PayableController {
  constructor(private readonly usecase: PayableUsecase) {}

  @Post()
  async create(@Body() body: CreatePayableDto): Promise<void> {
    await this.usecase.execute(body);
  }
}
