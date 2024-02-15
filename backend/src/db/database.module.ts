import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AssignorRepository, ReceivableRepository } from 'src/repositories';
import {
  PrismaAssignorRepository,
  PrismaReceivableRepository,
} from './repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
    {
      provide: ReceivableRepository,
      useClass: PrismaReceivableRepository,
    },
  ],
  exports: [PrismaService],
})
export class DatabaseModule {}
