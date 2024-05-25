import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { QueueModule } from 'src/queue/queue.module';
import { EmailModule } from 'src/email/email.module';
import { BatchTrackerModule } from 'src/queue/batch-tracker.module';

@Module({
  imports: [PrismaModule, QueueModule, EmailModule, BatchTrackerModule],
  controllers: [PayablesController],
  providers: [PayablesService],
  exports: [PayablesService],
})
export class PayablesModule {}
