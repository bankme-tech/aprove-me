import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AssignorRepository } from './repositories/assignor.repository';
import { PrismaAssignorRepository } from './repositories/prisma/prisma-assignor.repository';
import { PayableRepository } from './repositories/payable.repository';
import { PrismaPayableRepository } from './repositories/prisma/prisma-payable.repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
  ],
  exports: [AssignorRepository, PayableRepository],
})
export class DatabaseModule {}
