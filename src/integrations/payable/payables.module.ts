import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';

@Module({
  controllers: [PayableController],
})
export class PayableModule {}