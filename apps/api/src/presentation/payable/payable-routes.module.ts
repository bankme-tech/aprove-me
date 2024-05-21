import { Module } from '@nestjs/common';

import { PayableInfraModule } from '@infra/payable/payable-infra.module';

import { PayableModule } from '@application/payable/payable.module';

import { PayableController } from '@presentation/payable/controllers/payable.controller';

@Module({
  imports: [PayableModule, PayableInfraModule],
  controllers: [PayableController],
})
export class PayableRoutesModule {}
