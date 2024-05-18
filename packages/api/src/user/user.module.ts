import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user-repository';
import PrismaUserRepository from './repositories/prisma-user-repository';

@Module({
  providers: [UserService, { provide: UserRepository, useClass: PrismaUserRepository }],
  exports: [UserService],
})
export class UserModule {}
