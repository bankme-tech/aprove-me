import { Module } from '@nestjs/common';
import { ReceivableService } from './receivable.service';
import { ReceivableController } from './receivable.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ReceivableController],
  providers: [ReceivableService, PrismaService]
})
export class ReceivableModule {}
