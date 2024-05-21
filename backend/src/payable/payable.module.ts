import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import PayableRepository from './repositories/payable.repository';
import { PrismaPayableRepository } from './repositories/prisma-payable.repository';

@Module({
  controllers: [PayableController],
  providers: [
    PayableService,
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
  ],
})
export class PayableModule {}
