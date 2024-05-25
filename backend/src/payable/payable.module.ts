import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AssignorModule } from '../assignor/assignor.module';
import { AssignorService } from '../assignor/assignor.service';
import { QueueModule } from '../queue/queue.module';
import { SendEmailModule } from '../send-email/send-email.module';
import { PayableConsumer } from './consumers/payable.consumer';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

@Module({
  imports: [QueueModule, PrismaModule, SendEmailModule, AssignorModule],
  controllers: [PayableController],
  providers: [PayableService, PayableConsumer, AssignorService],
  exports: [PayableService],
})
export class PayableModule {}
