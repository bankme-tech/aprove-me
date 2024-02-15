import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { PrismaUserRepository } from 'src/db/repositories';
import { UserRepository } from 'src/repositories';
import { CryptoModule } from '../adapters/crypto.module';
import { AuthUserUseCase, CreateUserUseCase } from './use-cases';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    AuthUserUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  imports: [DatabaseModule, CryptoModule],
})
export class UserModule {}
