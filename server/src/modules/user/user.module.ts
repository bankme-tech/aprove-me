import { Module } from '@nestjs/common';
import { UserAuthController } from '@infra/http/user/controllers/user-auth.controller';

@Module({
  controllers: [UserAuthController],
})
export class UserModule {}
