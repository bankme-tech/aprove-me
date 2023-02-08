import { Module } from '@nestjs/common';
import { ReceivableService } from './receivable.service';
import { ReceivableController } from './receivable.controller';

@Module({
  controllers: [ReceivableController],
  providers: [ReceivableService]
})
export class ReceivableModule {}
