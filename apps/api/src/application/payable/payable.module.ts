import { Module, Provider } from '@nestjs/common';

import { PayableInfraModule } from '@infra/payable/payable-infra.module';
import { AssignorInfraModule } from '@infra/assignor/assignor-infra.module';

import { CreatePayableUseCase } from '@application/payable/usecases/create-payable.usecase';
import { FindOnePayableUseCase } from '@application/payable/usecases/find-one-payable-by-id.usecase';

const useCases: Provider[] = [CreatePayableUseCase, FindOnePayableUseCase];

@Module({
  imports: [PayableInfraModule, AssignorInfraModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class PayableModule {}
