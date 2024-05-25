import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaService } from 'src/infra/database/prisma.service';

@Module({
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
})
export class PayableModule {}
