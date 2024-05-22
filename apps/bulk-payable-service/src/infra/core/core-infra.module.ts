import { Module } from '@nestjs/common';

import { EnvModule } from '@bankme/nestjs-env';

import { CoreEnv } from '@infra/core/env/env';

@Module({
  imports: [EnvModule.forChild([CoreEnv])],
})
export class CoreInfraModule {}
