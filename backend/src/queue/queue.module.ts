import { Module, forwardRef } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { PayablesModule } from 'src/payables/payables.module';
import { BatchTrackerModule } from './batch-tracker.module';

@Module({
  imports: [forwardRef(() => PayablesModule), BatchTrackerModule],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService],
})
export class QueueModule {}
