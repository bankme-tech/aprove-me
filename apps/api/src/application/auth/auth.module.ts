import { Module, Provider } from '@nestjs/common';

import { AuthInfraModule } from '@infra/auth/auth-infra.module';

import { LoginUseCase } from '@application/auth/usecases/login.usecase';

const useCases: Provider[] = [LoginUseCase];

@Module({
  imports: [AuthInfraModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class AuthModule {}
