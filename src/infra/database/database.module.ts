import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAssignorsRepository } from './prisma/repositories/prisma-assignor-repository';
import { AssignorsRepository } from 'src/domain/operations/application/repositories/assignor-repository';

@Module({
  providers: [
    PrismaService, 
    {
      provide: AssignorsRepository,
      useClass: PrismaAssignorsRepository
    }
  ],
  exports: [
    PrismaService, 
    AssignorsRepository
  ]
})
export class DatabaseModule {}
