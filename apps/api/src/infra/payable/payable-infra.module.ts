import { Module } from '@nestjs/common';

import { PAYABLE_REPOSITORY } from '@infra/payable/repositories/payable.repository';
import { PayablePrismaRepository } from '@infra/payable/repositories/prisma/payable-prisma.repository';

@Module({
  providers: [
    {
      provide: PAYABLE_REPOSITORY,
      useClass: PayablePrismaRepository,
    },
  ],
  exports: [PAYABLE_REPOSITORY],
})
export class PayableInfraModule {}
