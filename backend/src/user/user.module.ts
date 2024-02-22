import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from './user.service';
import UserRepository from './repositories/userRepository';
import PrismaUserRepository from './repositories/prismaUserRepository';

@Module({
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
