import { Module, Provider } from '@nestjs/common';

import { PayableInfraModule } from '@infra/payable/payable-infra.module';
import { AssignorInfraModule } from '@infra/assignor/assignor-infra.module';

import { CreatePayableUseCase } from '@application/payable/usecases/create-payable.usecase';

const useCases: Provider[] = [CreatePayableUseCase];

@Module({
  imports: [PayableInfraModule, AssignorInfraModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class PayableModule {}
