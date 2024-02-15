import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateReceivableDto } from 'src/domain/dtos';
import {
  FindReceivableByIdUseCase,
  CreateReceivableUseCase,
} from './use-cases';
import { UUIDParam } from 'src/utils/validate-uuid';
import { AuthGuard } from '../guards/auth.guard';

@Controller('payable')
@UseGuards(AuthGuard)
export class ReceivableController {
  constructor(
    private readonly createReceivableUseCase: CreateReceivableUseCase,
    private readonly findReceivableByIdUseCase: FindReceivableByIdUseCase,
  ) {}

  @Post('')
  async create(@Body() createReceivable: CreateReceivableDto) {
    return await this.createReceivableUseCase.execute(createReceivable);
  }

  @Get(':id')
  async get(@UUIDParam('id') id: string) {
    return await this.findReceivableByIdUseCase.execute(id);
  }
}
