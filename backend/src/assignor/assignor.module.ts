import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { PrismaService } from 'src/database/prisma.service';
import AssignorRepository from './repositories/assignorRepository';
import PrismaAssignorRepository from './repositories/prismaAssignorRepository';

@Module({
  controllers: [AssignorController],
  providers: [
    AssignorService,
    PrismaService,
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
})
export class AssignorModule {}
