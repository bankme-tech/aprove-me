import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAssignorsRepository } from './prisma/repositories/prisma-assignor-repository';
import { AssignorsRepository } from 'src/domain/operations/application/repositories/assignor-repository';
import { ReceivableRepository } from 'src/domain/operations/application/repositories/receivable-repository';
import { PrismaReceivableRepository } from './prisma/repositories/prisma-receivable-repository.ts';
import { AccountsRepository } from 'src/domain/operations/application/repositories/account-repository';
import { PrismaAccountsRepository } from './prisma/repositories/prisma-account-repository';

@Module({
  providers: [
    PrismaService, 
    {
      provide: AssignorsRepository,
      useClass: PrismaAssignorsRepository
    },
    {
      provide: ReceivableRepository,
      useClass: PrismaReceivableRepository
    },
    {
      provide: AccountsRepository,
      useClass: PrismaAccountsRepository
    }
  ],
  exports: [
    PrismaService,
    AssignorsRepository,
    ReceivableRepository,
    AccountsRepository
  ]
})
export class DatabaseModule {}
