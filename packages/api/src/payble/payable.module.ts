import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PayableRepository } from './repositories/payable-repository';
import { AssignorRepository } from '@assignor/repositories/assignor-repository';
import { PrismaPayableRepository } from './repositories/prisma-payable-repository';
import { PrismaAssignorRepository } from '@assignor/repositories/prisma-assignor-repository';

@Module({
  controllers: [PayableController],
  providers: [
    PayableService,
    { provide: PayableRepository, useClass: PrismaPayableRepository },
    { provide: AssignorRepository, useClass: PrismaAssignorRepository },
  ],
})
export class PayableModule {}
