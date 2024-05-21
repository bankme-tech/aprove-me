import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

@Module({
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
})
export class PayableModule {}
