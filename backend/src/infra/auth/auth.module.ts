import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignToken } from '@core/auth/ports';
import { PassportModule } from '@nestjs/passport';
import { JWTService } from './jwt-service/jwt.service';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { JwtKeyService } from './decorators/current-user.decorator';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    JwtKeyService,

    {
      provide: SignToken,
      useClass: JWTService,
    },
  ],
  exports: [JwtStrategy, SignToken],
})
export class AuthModule {}
