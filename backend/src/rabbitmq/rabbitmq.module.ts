import { Module } from '@nestjs/common';
import { RabbitMQProducer } from './rabbitmq.producer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQConsumer } from './rabbitmq.consumer';
import { PayableService } from 'src/payable/payable.service';
import { EmailModule } from 'src/email/email.module';
import { ICreatePayableUseCase } from 'src/payable/usecases/create-payable.usecase.interface';
import { CreatePayableUseCase } from 'src/payable/usecases/create-payable.usecase';
import { IPayableRepository } from 'src/payable/repositories/payable.repository.interface';
import { PrismaPayableRepository } from 'src/payable/repositories/prisma-payable.repository';
import { AssignorModule } from 'src/assignor/assignor.module';
import { IPayableMapper } from 'src/payable/mappers/payable.mapper.interface';
import { PrismaPayableMapper } from 'src/payable/mappers/prisma-payable.mapper';
import { IProducer } from './interfaces/producer.interface';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.RABBITMQ_QUEUE,
          queueOptions: {
            durable: true,
            deadLetterExchange: process.env.RABBITMQ_DEAD_LETTER_EXCHANGE,
            deadLetterRoutingKey: process.env.RABBITMQ_DEAD_LETTER_ROUTING_KEY,
          },
          noAck: true,
        },
      },
    ]),
    EmailModule,
    AssignorModule,
  ],
  providers: [
    RabbitMQProducer,
    PayableService,
    {
      provide: ICreatePayableUseCase,
      useClass: CreatePayableUseCase,
    },
    {
      provide: IPayableRepository,
      useClass: PrismaPayableRepository,
    },
    {
      provide: IPayableMapper,
      useClass: PrismaPayableMapper,
    },
    {
      provide: IProducer,
      useClass: RabbitMQProducer,
    },
  ],
  controllers: [RabbitMQConsumer],
  exports: [ClientsModule],
})
export class RabbitMQModule {}
