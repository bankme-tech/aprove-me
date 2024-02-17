import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class UserModule {}
