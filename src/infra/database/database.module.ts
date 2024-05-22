import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAssignorsRepository } from './prisma/repositories/prisma-assignor-repository';
import { AssignorsRepository } from 'src/domain/operations/application/repositories/assignor-repository';
import { ReceivableRepository } from 'src/domain/operations/application/repositories/receivable-repository';
import { PrismaReceivableRepository } from './prisma/repositories/prisma-receivable-repository.ts';

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
    }
  ],
  exports: [
    PrismaService,
    AssignorsRepository,
    ReceivableRepository
  ]
})
export class DatabaseModule {}
