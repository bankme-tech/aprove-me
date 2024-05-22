import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserRepository } from './user.repository';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthController],
  providers: [
    AuthGuard,
    AuthService,
    CryptoService,
    TokenService,
    UserRepository,
  ],
})
export class AuthModule {}
