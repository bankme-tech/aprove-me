import { Global, Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { RabbitMQController } from './rabbitmq.controller';
import PayableRepository from '../payable/repositories/payableRepository';
import { PrismaPayableRepository } from '../payable/repositories/prismaPayableRepository';
import { ConsumerService } from './consumer.service';
import { DeadProducerService } from './dead-producer.service';

@Global()
@Module({
  controllers: [RabbitMQController],
  providers: [
    ProducerService,
    DeadProducerService,
    ConsumerService,
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
  ],
  exports: [ProducerService],
})
export class RabbitMQModule {}
