import { Module, Provider } from '@nestjs/common';

import { PayableInfraModule } from '@infra/payable/payable-infra.module';
import { AssignorInfraModule } from '@infra/assignor/assignor-infra.module';

import { CreateOnePayableUseCase } from '@application/payable/usecases/create-one-payable.usecase';

const useCases: Provider[] = [CreateOnePayableUseCase];

@Module({
  imports: [PayableInfraModule, AssignorInfraModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class PayableModule {}
