import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AssignorRepository } from '@/app/repositories/assignor.repository';
import { PayableRepository } from '@/app/repositories/payable.repository';
import { PrismaAssignorRepository } from '@/infra/database/prisma/repositories/prisma-assignor-repository';
import { PrismaPayableRepository } from '@/infra/database/prisma/repositories/prisma-payable-repository';
import { UserRepository } from '@/app/repositories/user.repository';

@Module({
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
  exports: [AssignorRepository, PayableRepository, UserRepository],
})
export class DatabaseModule {}
