import { DynamicModule, Module, Type } from '@nestjs/common';

import { EnvModule } from '@bankme/nestjs-env';

import { PrismaInfraModule } from '@infra/prisma/prisma.module';

import { UserRoutesModule } from '@presentation/user/user-routes.module';

import path from 'path';

type Imports = (Type<unknown> | DynamicModule)[];

const config: Imports = [
  PrismaInfraModule,
  EnvModule.forRoot({ envFilePath: path.resolve(__dirname, '../.env') }),
];

const routes: Imports = [UserRoutesModule];

@Module({
  imports: [...config, ...routes],
})
export class AppModule {}
