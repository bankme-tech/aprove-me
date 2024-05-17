import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';

@Module({
  controllers: [PayableController],
  providers: [PayableService],
})
export class PayableModule {}
