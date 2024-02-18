import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { CoreModule } from 'bme/core';

@Module({
  imports: [CoreModule],
  controllers: [PayableController],
  providers: [PayableService],
})
export class PayableModule {}
