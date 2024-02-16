import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { CreatePayableUseCase } from './use-cases/create-payable';
import { DeletePayableUseCase } from './use-cases/delete-payable';
import { GetPayableByIdUseCase } from './use-cases/get-payable-by-id';
import { ListPayablesUseCase } from './use-cases/list-payables';
import { UpdatePayableUseCase } from './use-cases/update-payable';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreatePayableUseCase,
    DeletePayableUseCase,
    GetPayableByIdUseCase,
    ListPayablesUseCase,
    UpdatePayableUseCase,
  ],
  exports: [
    CreatePayableUseCase,
    DeletePayableUseCase,
    GetPayableByIdUseCase,
    ListPayablesUseCase,
    UpdatePayableUseCase,
  ],
})
export class PayableModule {}
