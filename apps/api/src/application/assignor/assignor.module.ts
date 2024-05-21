import { Module, Provider } from '@nestjs/common';

import { AssignorInfraModule } from '@infra/assignor/assignor-infra.module';

import { FindOneAssignorUseCase } from '@application/assignor/usecases/find-one-payable-by-id.usecase';

const useCases: Provider[] = [FindOneAssignorUseCase];

@Module({
  imports: [AssignorInfraModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class AssignorModule {}
