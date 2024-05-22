import { Module } from '@nestjs/common';
import { RegisterPayableController } from './controllers/register-payable/register-payable.controller';
import { RegisterPayableService } from './services/register-payable/register-payable.service';
import { DatabaseModule } from '~/database.module';
import { FindPayableByIdController } from './controllers/find-payable-by-id/find-payable-by-id.controller';
import { FindPayableByIdService } from './services/find-payable-by-id/find-payable-by-id.service';
import { GetPayablesService } from './services/get-payables/get-payables.service';
import { DeletePayableService } from './services/delete-payable/delete-payable.service';
import { UpdatePayableService } from './services/update-payable/update-payable.service';
import { GetPayablesController } from './controllers/get-payables/get-payables.controller';
import { UpdatePayableController } from './controllers/update-payable/update-payable.controller';
import { DeletePayableController } from './controllers/delete-payable/delete-payable.controller';
import { BullModule } from '@nestjs/bull';
import { QueuesName } from '~/common/types/queues';
import { RegisterBatchPayableService } from './services/register-batch-payable/register-batch-payable.service';
import { RegisterBatchPayableController } from './controllers/register-batch-payable/register-batch-payable.controller';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: QueuesName.PAYABLE,
      limiter: {
        max: 1,
        duration: 10 * 1000, // 10 seconds
      },
      defaultJobOptions: {
        attempts: 4,
        backoff: 5 * 5000, // 5 seconds
      },
    }),
  ],
  controllers: [
    RegisterPayableController,
    RegisterBatchPayableController,
    FindPayableByIdController,
    GetPayablesController,
    UpdatePayableController,
    DeletePayableController,
  ],
  providers: [
    RegisterPayableService,
    FindPayableByIdService,
    GetPayablesService,
    DeletePayableService,
    UpdatePayableService,
    RegisterBatchPayableService,
  ],
})
export class PayableModule {}
