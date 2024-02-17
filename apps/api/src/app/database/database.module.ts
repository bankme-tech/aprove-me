import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AssignorRepository } from './repositories/assignor.repository';
import { PrismaAssignorRepository } from './repositories/prisma/prisma-assignor.repository';
import { PayableRepository } from './repositories/payable.repository';
import { PrismaPayableRepository } from './repositories/prisma/prisma-payable.repository';
import { UserRepository } from './repositories/user.repository';
import { PrismaUserRepository } from './repositories/prisma/prisma-user.repository';

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
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [AssignorRepository, PayableRepository, UserRepository],
})
export class DatabaseModule {}
