import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReceivableDto, UpdateReceivableDto } from 'src/domain/dtos';
import { UUIDParam } from 'src/utils/validate-uuid';
import { AuthGuard } from '../guards/auth.guard';
import {
  CreateReceivableUseCase,
  DeleteReceivableUseCase,
  FindReceivableByIdUseCase,
  UpdateReceivableUseCase,
} from './use-cases';

@Controller('payable')
@UseGuards(AuthGuard)
export class ReceivableController {
  constructor(
    private readonly createReceivableUseCase: CreateReceivableUseCase,
    private readonly findReceivableByIdUseCase: FindReceivableByIdUseCase,
    private readonly deleteReceivableUseCase: DeleteReceivableUseCase,
    private readonly updateReceivableUseCase: UpdateReceivableUseCase,
  ) {}

  @Post('')
  async create(@Body() createReceivable: CreateReceivableDto) {
    return await this.createReceivableUseCase.execute(createReceivable);
  }

  @Get(':id')
  async get(@UUIDParam('id') id: string) {
    return await this.findReceivableByIdUseCase.execute(id);
  }

  @Delete(':id')
  async delete(@UUIDParam('id') id: string) {
    return await this.deleteReceivableUseCase.execute(id);
  }

  @Patch(':id')
  async update(
    @UUIDParam('id') id: string,
    @Body() updateReceivable: UpdateReceivableDto,
  ) {
    return await this.updateReceivableUseCase.execute({
      id,
      ...updateReceivable,
    });
  }
}
