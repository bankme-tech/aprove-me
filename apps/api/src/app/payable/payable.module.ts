import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { CreatePayableUseCase } from './use-cases/create-payable';
import { DeletePayableUseCase } from './use-cases/delete-payable';
import { GetPayableByIdUseCase } from './use-cases/get-payable-by-id';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreatePayableUseCase,
    DeletePayableUseCase,
    GetPayableByIdUseCase,
  ],
  exports: [CreatePayableUseCase, DeletePayableUseCase, GetPayableByIdUseCase],
})
export class PayableModule {}
