import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import UserRepository from './repositories/userRepository';
import PrismaUserRepository from './repositories/prismaUserRepository';
import { UserController } from './users.controller';

@Module({
  controllers: [UserController],
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
