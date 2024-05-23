import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreatePayableUsecase } from './create-payable.usecase';
import { CreatePayableDto } from './create-payable.dto';
import { ReceivableEntity } from 'domain/entity';

@Controller('/integrations')
export class PayableController {
  constructor(private readonly createPayableUsecase: CreatePayableUsecase) {}

  @Post('/payable')
  async create(@Body() body: CreatePayableDto): Promise<void> {
    await this.createPayableUsecase.execute(body);
  }
}
