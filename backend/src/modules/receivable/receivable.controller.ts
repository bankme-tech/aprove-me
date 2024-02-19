import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateReceivableBatchDto,
  CreateReceivableDto,
  UpdateReceivableDto,
} from 'src/domain/dtos';
import { UUIDParam } from 'src/utils/validate-uuid';
import { AuthGuard } from '../guards/auth.guard';
import {
  CreateReceivableUseCase,
  DeleteReceivableUseCase,
  FindReceivableByIdUseCase,
  UpdateReceivableUseCase,
  FetchAllReceivableUseCase,
} from './use-cases';
import { ReceivableBatchService } from './jobs/receivable-batch.service';

@Controller('payable')
@UseGuards(AuthGuard)
export class ReceivableController {
  constructor(
    private readonly createReceivableUseCase: CreateReceivableUseCase,
    private readonly findReceivableByIdUseCase: FindReceivableByIdUseCase,
    private readonly deleteReceivableUseCase: DeleteReceivableUseCase,
    private readonly updateReceivableUseCase: UpdateReceivableUseCase,
    private readonly receivableBatchService: ReceivableBatchService,
    private readonly fetchReceivableUseCase: FetchAllReceivableUseCase,
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

  @Post('batch')
  async createMany(@Body() createReceivableBatchDto: CreateReceivableBatchDto) {
    this.receivableBatchService.createReceivable(createReceivableBatchDto);
  }

  @Get()
  async fetchAll() {
    return await this.fetchReceivableUseCase.execute();
  }
}
