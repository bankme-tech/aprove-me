import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import UserRepository from './repositories/userRepository';
import PrismaUserRepository from './repositories/prismaUserRepository';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
