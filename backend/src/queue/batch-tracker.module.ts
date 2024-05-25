import { Module } from '@nestjs/common';
import { BatchTrackerService } from './batch-tracker.service';

@Module({
  providers: [BatchTrackerService],
  exports: [BatchTrackerService],
})
export class BatchTrackerModule {}
