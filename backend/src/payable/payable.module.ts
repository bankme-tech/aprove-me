import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import PayableRepository from './repositories/payableRepository';
import { PrismaPayableRepository } from './repositories/prismaPayableRepository';
import PrismaAssignorRepository from 'src/assignor/repositories/prismaAssignorRepository';
import AssignorRepository from 'src/assignor/repositories/assignorRepository';
import { ProducerService } from 'src/rabbitmq/producer.service';

@Module({
  controllers: [PayableController],
  providers: [
    PayableService,
    ProducerService,
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
