import { Module } from '@nestjs/common';
import { PrismaService } from './common/database/prisma.service';
import { PrismaAssignorRepository } from './modules/assignor/repositories/prisma/assignor.repository';
import { IAssignorRepository } from './modules/assignor/repositories/interfaces/assignor.repository-interface';
import { IPayableRepository } from './modules/payable/repositories/interfaces/payable.repository-interface';
import { PrismaPayableRepository } from './modules/payable/repositories/prisma/payable.repository';
import { PrismaAccountRepository } from './modules/auth/repositories/prisma/account.repository';
import { IAccountRepository } from './modules/auth/repositories/interfaces/account.repository-interface';

@Module({
  providers: [
    PrismaService,
    { useClass: PrismaAssignorRepository, provide: IAssignorRepository },
    { useClass: PrismaPayableRepository, provide: IPayableRepository },
    { useClass: PrismaAccountRepository, provide: IAccountRepository },
  ],
  exports: [IAssignorRepository, IPayableRepository, IAccountRepository],
})
export class DatabaseModule {}
