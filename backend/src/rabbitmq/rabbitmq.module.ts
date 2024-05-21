import { Global, Module } from '@nestjs/common';
import PayableRepository from 'src/payable/repositories/payable.repository';
import { PrismaPayableRepository } from 'src/payable/repositories/prisma-payable.repository';
import { ProducerService } from './producer.service';
import { DeadProducerService } from './dead-producer.service';
import { ConsumerService } from './consumer.service';
import { RabbitMQController } from './rabbitmq.controller';

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
