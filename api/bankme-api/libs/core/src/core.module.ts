import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { Success } from './messages/success';
import { Payable } from './domains/payables/payable.entity';
import { PayableRepository } from './infra/database/repositories/payable-repository';
import { PrismaService } from './infra/database/prisma-service';

@Module({
  providers: [CoreService, Success, PrismaService, Payable, PayableRepository],
  exports: [CoreService, Success, Payable, PayableRepository],
})
export class CoreModule {}
