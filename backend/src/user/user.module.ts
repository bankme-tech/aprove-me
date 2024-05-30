import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { BcryptAdapter } from 'src/shared/adapters';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'Encrypter',
      useClass: BcryptAdapter,
    },
    PrismaService,
  ],
})
export class UserModule {}
