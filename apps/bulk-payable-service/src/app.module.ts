import { DynamicModule, Module, Type } from '@nestjs/common';

import { EnvModule } from '@bankme/nestjs-env';

import { PrismaInfraModule } from '@infra/prisma/prisma.module';

import { AppController } from './app.controller';
import path from 'path';

type Imports = (Type<unknown> | DynamicModule)[];

const config: Imports = [
  PrismaInfraModule,
  EnvModule.forRoot({
    envFilePath: [path.resolve(__dirname, '../.env')],
  }),
];

@Module({
  imports: [...config],
  controllers: [AppController],
})
export class AppModule {}
