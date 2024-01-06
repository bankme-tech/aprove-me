import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

@Module({
  controllers: [PayableController],
  providers: [PayableService],
})
export class PayableModule {}
