import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserUseCase } from './use-cases/create-user';
import { DatabaseModule } from '@/database/database.module';
import { authConfig } from 'src/config/auth';
import { AuthenticateUseCase } from './use-cases/authenticate';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: authConfig.secret,
      signOptions: {
        expiresIn: authConfig.expiresIn,
      },
    }),
  ],
  providers: [CreateUserUseCase, AuthenticateUseCase],
  exports: [CreateUserUseCase, AuthenticateUseCase],
})
export class UserModule {}
