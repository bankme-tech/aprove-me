import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [],
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
})
export class PayableModule {}
