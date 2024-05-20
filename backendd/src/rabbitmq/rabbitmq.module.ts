import { Global, Module } from '@nestjs/common';
import { RabbitmqController } from './rabbitmq.controller';
import { PayableModule } from 'src/payable/payable.module';
import PayableRepository from 'src/payable/repository/payableRepository';
import { PrismaPayableRepository } from 'src/payable/repository/prismaPayableRepository';
import { ProducerService } from './producer';
import { DeadProducerService } from './deadProducer';
import { ConsumerService } from './consumer';
import { EmailService } from './email.service';

@Global()
@Module({
  imports: [PayableModule],
  controllers: [RabbitmqController],
  providers: [
    ProducerService,
    DeadProducerService,
    ConsumerService,
    EmailService,
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
  ],
  exports: [ProducerService],
})
export class RabbitmqModule {}
