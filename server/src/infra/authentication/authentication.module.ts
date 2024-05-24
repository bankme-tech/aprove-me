import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from '@infra/database/database.module';
import { CryptoModule } from '@infra/crypto/crypto.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticateUserService } from '@modules/user/services/authenticate-user.service';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    CryptoModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
  providers: [
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    AuthenticateUserService,
  ],
})
export class AuthenticationModule {}
