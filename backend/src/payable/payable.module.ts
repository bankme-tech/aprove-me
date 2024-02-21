import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaService } from 'src/database/prisma.service';
import PayableRepository from './repositories/payableRepository';
import { PrismaPayableRepository } from './repositories/prismaPayableRepository';

@Module({
  controllers: [PayableController],
  providers: [
    PayableService,
    PrismaService,
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
  ],
})
export class PayableModule {}
