import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IUserRepository } from './repositories/user.repository.interface';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { IUserEncrypter } from './encrypters/user.encrypter.interface';
import { BcryptUserEncrypter } from './encrypters/bcrypt-user.encrypter';
import { IUserMapper } from './mappers/user.mapper.interface';
import { PrismaUserMapper } from './mappers/prisma-user.mapper';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IUserEncrypter,
      useClass: BcryptUserEncrypter,
    },
    {
      provide: IUserMapper,
      useClass: PrismaUserMapper,
    },
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
