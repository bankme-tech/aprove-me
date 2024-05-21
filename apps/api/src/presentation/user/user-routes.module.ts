import { Module } from '@nestjs/common';

import { UserInfraModule } from '@infra/user/user-infra.module';

import { UserModule } from '@application/user/user.module';

import { UserController } from '@presentation/user/controllers/user.controller';

@Module({
  imports: [UserModule, UserInfraModule],
  controllers: [UserController],
})
export class UserRoutesModule {}
