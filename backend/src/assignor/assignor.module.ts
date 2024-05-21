import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import AssignorRepository from './repositories/assignor.repository';
import PrismaAssignorRepository from './repositories/prisma-assignor-repository';

@Module({
  controllers: [AssignorController],
  providers: [
    AssignorService,
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
})
export class AssignorModule {}
