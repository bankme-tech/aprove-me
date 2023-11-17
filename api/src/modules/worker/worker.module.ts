import { Logger, Module } from '@nestjs/common';
import { PayableProcessor } from './payable.processor';
import { PayableModule } from '../payable/payable.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PayableModule,
    BullModule.registerQueue({
      name: 'create_payable',
    }),
  ],
  providers: [PayableProcessor, Logger],
})
export class WorkerModule {}
