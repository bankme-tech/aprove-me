import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { CreatePayableUseCase } from './use-cases/create-payable';

@Module({
  imports: [DatabaseModule],
  providers: [CreatePayableUseCase],
  exports: [CreatePayableUseCase],
})
export class PayableModule {}
