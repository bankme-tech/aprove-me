import { Module, Provider } from '@nestjs/common';

import { PayableInfraModule } from '@infra/payable/payable-infra.module';
import { AssignorInfraModule } from '@infra/assignor/assignor-infra.module';

import { CreateOnePayableUseCase } from '@application/payable/usecases/create-one-payable.usecase';
import { FindOnePayableUseCase } from '@application/payable/usecases/find-one-payable-by-id.usecase';
import { DeleteOnePayableUseCase } from '@application/payable/usecases/delete-one-payable.usecase';
import { UpdateOnePayableUseCase } from '@application/payable/usecases/update-one-payable.usecase';

const useCases: Provider[] = [
  CreateOnePayableUseCase,
  FindOnePayableUseCase,
  UpdateOnePayableUseCase,
  DeleteOnePayableUseCase,
];

@Module({
  imports: [PayableInfraModule, AssignorInfraModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class PayableModule {}
