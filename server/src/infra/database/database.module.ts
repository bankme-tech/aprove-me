import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AssignorRepository } from '@modules/assignor/repositories/assignor.repository';
import { PrismaAssignorRepository } from './prisma/repositories/prisma-assignor.repository';
import { PayableRepository } from '@modules/payable/repositories/payable.repository';
import { PrismaPayableRepository } from './prisma/repositories/prisma-payable.repository';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';

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
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [AssignorRepository, PayableRepository, UserRepository],
})
export class DatabaseModule {}
