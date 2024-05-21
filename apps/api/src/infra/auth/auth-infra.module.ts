import { Module } from '@nestjs/common';

import { EnvModule } from '@bankme/nestjs-env';

import { AuthEnv } from '@infra/auth/env/env';

@Module({
  imports: [EnvModule.forChild([AuthEnv])],
})
export class AuthInfraModule {}
