import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ReceivableEntity } from '../domain/entity';

import { CreatePayableUsecase } from './create-payable.usecase';
import { GetPayableUsecase } from './get-payable.usecase';

import { CreatePayableDto, ReceivableDto } from './dto';

@Controller('/integrations')
export class PayableController {
  constructor(
    private readonly createPayableUsecase: CreatePayableUsecase,
    private readonly getReceivableByIdUsecase: GetPayableUsecase
  ) {}

  @Post('/payable')
  async create(@Body() body: CreatePayableDto): Promise<void> {
    await this.createPayableUsecase.execute(body);
  }

  @Get('/payable/:id')
  async getById(@Param('id') id: string): Promise<ReceivableDto | null> {
    const receivable = await this.getReceivableByIdUsecase.execute(id);
    return new ReceivableDto(receivable.toJSON());
  }
}
