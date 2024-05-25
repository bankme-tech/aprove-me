import { Global, Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { PayableService } from '../payable/payable.service';
import { MicroServicesController } from './microservices.controller';
import { DeadProducerService } from './dead.producer.service';
import { EmailService } from '../email/email.service';
import { AssignorService } from 'src/assignor/assignor.service';

@Global()
@Module({
  controllers: [MicroServicesController],
  providers: [
    ProducerService,
    ConsumerService,
    PayableService,
    DeadProducerService,
    EmailService,
    AssignorService,
  ],
  exports: [ProducerService],
})
export class MicroservicesModule {}
