import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { CreatePayableUseCase } from './use-cases/create-payable';
import { DeletePayableUseCase } from './use-cases/delete-payable';
import { GetPayableByIdUseCase } from './use-cases/get-payable-by-id';
import { ListPayablesUseCase } from './use-cases/list-payables';
import { UpdatePayableUseCase } from './use-cases/update-payable';
import { BullModule } from '@nestjs/bull';
import {
  PAYABLE_FAILURE_QUEUE,
  PAYABLE_PROCESS_QUEUE,
} from './constants/queues';
import { PayableProcessConsumerWorker } from './workers/payable-process-consumer';
import { PayableProducerWorker } from './workers/payable-producer';
import { PayableFailureConsumerWorker } from './workers/payable-failure-consumer';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({ name: PAYABLE_PROCESS_QUEUE }),
    BullModule.registerQueue({ name: PAYABLE_FAILURE_QUEUE }),
  ],
  providers: [
    CreatePayableUseCase,
    DeletePayableUseCase,
    GetPayableByIdUseCase,
    ListPayablesUseCase,
    UpdatePayableUseCase,
    PayableProcessConsumerWorker,
    PayableFailureConsumerWorker,
    PayableProducerWorker,
  ],
  exports: [
    CreatePayableUseCase,
    DeletePayableUseCase,
    GetPayableByIdUseCase,
    ListPayablesUseCase,
    UpdatePayableUseCase,
    PayableProducerWorker,
  ],
})
export class PayableModule {}
