import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  controllers: [],
  providers: [UserService],
})
export class UserModule {}
