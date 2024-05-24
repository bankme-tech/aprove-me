import { Module, forwardRef } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { PayablesModule } from 'src/payables/payables.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [forwardRef(() => PayablesModule)],
  providers: [ProducerService, ConsumerService, EmailService],
  exports: [ProducerService],
})
export class QueueModule {}
