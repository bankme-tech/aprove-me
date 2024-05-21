import { Module, Provider } from '@nestjs/common';

import { UserInfraModule } from '@infra/user/user-infra.module';

import { CreateUserUseCase } from '@application/user/usecases/create-user.usecase';

const useCases: Provider[] = [CreateUserUseCase];

@Module({
  imports: [UserInfraModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class UserModule {}
