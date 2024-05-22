import { DynamicModule, Module, Type, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';

import { EnvModule } from '@bankme/nestjs-env';

import { PrismaInfraModule } from '@infra/prisma/prisma.module';
import { UserInfraModule } from '@infra/user/user-infra.module';
import { CoreInfraModule } from '@infra/core/core-infra.module';

import { JwtGuard } from '@application/auth/guards/jwt.guard';

import { UserRoutesModule } from '@presentation/user/user-routes.module';
import { AuthRoutesModule } from '@presentation/auth/auth-routes.module';
import { PayableRoutesModule } from '@presentation/payable/payable-routes.module';
import { AssignorRoutesModule } from '@presentation/assignor/assignor-routes.module';

import path from 'path';

type Imports = (Type<unknown> | DynamicModule)[];

const infra: Imports = [
  CoreInfraModule,
  UserInfraModule, // To allow using the JWT guard globally
];

const config: Imports = [
  PrismaInfraModule,
  EnvModule.forRoot({
    envFilePath: [path.resolve(__dirname, '../.env')],
  }),
];

const routes: Imports = [
  AuthRoutesModule,
  UserRoutesModule,
  PayableRoutesModule,
  AssignorRoutesModule,
];

@Module({
  imports: [...infra, ...config, ...routes],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
