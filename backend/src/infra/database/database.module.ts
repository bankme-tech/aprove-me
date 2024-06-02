import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/services';
import { PayableRepository } from '@core/payable/ports/repository';
import { AssignorRepository } from '@core/assignor/ports/repository';
import {
  PrismaPayableRepository,
  PrismaAssignorRepository,
  PrismaPermissionRepository,
} from '@infra/database/prisma/repositories';
import { PermissionRepository } from '@core/auth/ports';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: PermissionRepository,
      useClass: PrismaPermissionRepository,
    },
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
  exports: [
    PrismaService,
    PermissionRepository,
    PayableRepository,
    AssignorRepository,
  ],
})
export class DatabaseModule {}
