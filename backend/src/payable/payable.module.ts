import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import PayableRepository from './repository/payableRepository';
import { PrismaPayableRepository } from './repository/prismaPayableRepository';
import AssignorRepository from 'src/assignor/repositories/assignorRepository';
import PrismaAssignorRepository from 'src/assignor/repositories/prismaAssignorRepository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYABLE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'payable_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [PayableController],
  providers: [
    PayableService,
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
})
export class PayableModule {}
