import { Module, Provider } from '@nestjs/common';

import { UserInfraModule } from '@infra/user/user-infra.module';

import { CreateUserUseCase } from '@application/user/usecases/create-user.usecase';
import { FindOneUserUseCase } from '@application/user/usecases/find-one-user.usecase';
import { FindMeUseCase } from '@application/user/usecases/find-me-usecase';

const useCases: Provider[] = [
  CreateUserUseCase,
  FindOneUserUseCase,
  FindMeUseCase,
];

@Module({
  imports: [UserInfraModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class UserModule {}
