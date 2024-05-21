import { Module, Type } from '@nestjs/common';

import { UserInfraModule } from '@infra/user/user-infra.module';
import { AuthInfraModule } from '@infra/auth/auth-infra.module';

import { AuthModule } from '@application/auth/auth.module';

import { AuthController } from '@presentation/auth/controllers/auth.controller';

const infra: Type<unknown>[] = [AuthInfraModule, UserInfraModule];

@Module({
  imports: [AuthModule, ...infra],
  controllers: [AuthController],
})
export class AuthRoutesModule {}
