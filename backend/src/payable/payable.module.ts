import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PayableRepository } from './payable.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, PrismaService],
})
export class PayableModule {}
