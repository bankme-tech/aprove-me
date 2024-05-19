import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { RabbitMQController } from './rabbitmq.controller';
import { DeadProducerService } from './dead-producer.service';
import { PayableRepository } from '@payable/repositories/payable-repository';
import PrismaPayableRepository from '@payable/repositories/prisma-payable-repository';

@Module({
  controllers: [RabbitMQController],
  providers: [
    ProducerService,
    ConsumerService,
    DeadProducerService,
    { provide: PayableRepository, useClass: PrismaPayableRepository },
  ],
  exports: [ProducerService],
})
export class RabbitMQModule {}
