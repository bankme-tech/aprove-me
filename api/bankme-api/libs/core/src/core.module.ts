import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { Success } from './messages/success';
import { Fails } from './messages/fails';
import { Payable } from './domains/payables/entities/payable.entity';
import { PayableVO } from './domains/payables/vos/payable.vo';
import { PayableRepository } from './infra/database/repositories/payable-repository';
import { PrismaService } from './infra/database/prisma-service';
import { PayableDomainService } from './domains/payables/payable-service';

@Module({
  providers: [
    CoreService,
    Success,
    Fails,
    PrismaService,
    Payable,
    PayableVO,
    PayableRepository,
    PayableDomainService,
  ],
  exports: [
    CoreService,
    Success,
    Fails,
    PrismaService,
    Payable,
    PayableVO,
    PayableRepository,
    PayableDomainService,
  ],
})
export class CoreModule {}
