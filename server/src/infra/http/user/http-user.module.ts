import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UserAuthController } from './controllers/user-auth.controller';
import { AuthenticateUserService } from '@modules/user/services/authenticate-user.service';
import { AuthenticationModule } from '@infra/authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshUserTokenService } from '@modules/user/services/refresh-user-token.service';

@Module({
  imports: [
    DatabaseModule,
    AuthenticationModule,
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
  controllers: [UserAuthController],
  providers: [AuthenticateUserService, RefreshUserTokenService],
})
export class HttpUserModule {}
