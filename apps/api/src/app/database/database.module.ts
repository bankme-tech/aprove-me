import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AssignorRepository } from './repositories/assignor.repository';
import { PrismaAssignorRepository } from './repositories/prisma/prisma-assignor.repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
  exports: [AssignorRepository],
})
export class DatabaseModule {}
