import { Module, Provider } from '@nestjs/common';

import { AssignorInfraModule } from '@infra/assignor/assignor-infra.module';

import { FindOneAssignorUseCase } from '@application/assignor/usecases/find-one-assignor.usecase';
import { UpdateOneAssignorUseCase } from '@application/assignor/usecases/update-one-assignor.usecase';

const useCases: Provider[] = [FindOneAssignorUseCase, UpdateOneAssignorUseCase];

@Module({
  imports: [AssignorInfraModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class AssignorModule {}
