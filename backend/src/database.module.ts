import { Module } from '@nestjs/common';
import { PrismaService } from './common/database/prisma.service';
import { PrismaAssignorRepository } from './modules/assignor/repositories/prisma/assignor.repository';
import { IAssignorRepository } from './modules/assignor/repositories/interfaces/assignor.repository-interface';

@Module({
  providers: [
    PrismaService,
    { useClass: PrismaAssignorRepository, provide: IAssignorRepository },
  ],
  exports: [IAssignorRepository],
})
export class DatabaseModule {}
