import { DynamicModule, Module, Type } from '@nestjs/common';

import { EnvModule } from '@bankme/nestjs-env';

import { PrismaInfraModule } from '@infra/prisma/prisma.module';
import { CoreInfraModule } from '@infra/core/core-infra.module';

import { PayableRoutesModule } from '@presentation/payable/payable-routes.module';

import path from 'path';

type Imports = (Type<unknown> | DynamicModule)[];

const config: Imports = [
  PrismaInfraModule,
  CoreInfraModule,
  EnvModule.forRoot({
    envFilePath: [path.resolve(__dirname, '../.env')],
  }),
];

const routes: Imports = [PayableRoutesModule];

@Module({
  imports: [...config, ...routes],
})
export class AppModule {}
