import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaService } from 'src/database/prisma.service';
import PayableRepository from './repositories/payableRepository';
import { PrismaPayableRepository } from './repositories/prismaPayableRepository';
import PrismaAssignorRepository from 'src/assignor/repositories/prismaAssignorRepository';
import AssignorRepository from 'src/assignor/repositories/assignorRepository';

@Module({
  controllers: [PayableController],
  providers: [
    PayableService,
    PrismaService,
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
