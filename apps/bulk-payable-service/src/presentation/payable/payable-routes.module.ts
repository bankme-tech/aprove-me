import { Module } from '@nestjs/common';

import { PayableModule } from '@application/payable/payable.module';

import { PayableController } from '@presentation/payable/controller/payable.controller';

@Module({
  imports: [PayableModule],
  controllers: [PayableController],
})
export class PayableRoutesModule {}
