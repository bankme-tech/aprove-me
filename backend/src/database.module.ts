import { Module } from '@nestjs/common';
import { PrismaService } from './common/database/prisma.service';
import { PrismaAssignorRepository } from './modules/assignor/repositories/prisma/assignor.repository';
import { IAssignorRepository } from './modules/assignor/repositories/interfaces/assignor.repository-interface';
import { IPayableRepository } from './modules/payable/repositories/interfaces/payable.repository-interface';
import { PrismaPayableRepository } from './modules/payable/repositories/prisma/payable.repository';

@Module({
  providers: [
    PrismaService,
    { useClass: PrismaAssignorRepository, provide: IAssignorRepository },
    { useClass: PrismaPayableRepository, provide: IPayableRepository },
  ],
  exports: [IAssignorRepository, IPayableRepository],
})
export class DatabaseModule {}
