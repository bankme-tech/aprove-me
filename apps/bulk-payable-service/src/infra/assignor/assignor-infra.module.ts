import { Module } from '@nestjs/common';

import { AssignorPrismaRepository } from '@infra/assignor/repositories/prisma/assignor-prisma.repository';
import { ASSIGNOR_REPOSITORY } from '@infra/assignor/repositories/assignor.repository';

@Module({
  providers: [
    {
      provide: ASSIGNOR_REPOSITORY,
      useClass: AssignorPrismaRepository,
    },
  ],
  exports: [ASSIGNOR_REPOSITORY],
})
export class AssignorInfraModule {}
