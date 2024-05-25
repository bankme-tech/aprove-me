import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

@Module({
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
  exports: [PayableService],
})
export class PayableModule {}
