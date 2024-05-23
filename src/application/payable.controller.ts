import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ReceivableEntity } from '../domain/entity';

import { CreatePayableUsecase } from './create-payable.usecase';
import { GetPayableUsecase } from './get-payable.usecase';
import { GetAssignorUsecase } from './get-assignor.usecase';

import { CreatePayableDto, GetAssignorDto, GetReceivableDto } from './dto';

@Controller('/integrations')
export class PayableController {
  constructor(
    private readonly createPayableUsecase: CreatePayableUsecase,
    private readonly getReceivableByIdUsecase: GetPayableUsecase,
    private readonly getAssignorByIdUsecase: GetAssignorUsecase
  ) {}

  @Post('/payable')
  async create(@Body() body: CreatePayableDto): Promise<{ assignorId: string }> {
    const id = await this.createPayableUsecase.execute(body);
    return { assignorId: id };
  }

  @Get('/payable/:id')
  async getReceivableById(
    @Param('id') id: string
  ): Promise<GetReceivableDto | null> {
    const receivable = await this.getReceivableByIdUsecase.execute(id);
    return new GetReceivableDto(receivable.toJSON());
  }

  @Get('/assignor/:id')
  async getAssignorById(
    @Param('id') id: string
  ): Promise<GetAssignorDto | null> {
    const assignor = await this.getAssignorByIdUsecase.execute(id);
    return new GetAssignorDto(assignor.toJSON());
  }
}
