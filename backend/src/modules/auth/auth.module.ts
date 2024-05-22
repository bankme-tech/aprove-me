import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '~/database.module';
import { AuthenticateAccountService } from './services/authenticate-account/authenticate-account.service';
import { AuthenticateAccountController } from './controllers/authenticate-account/authenticate-account.controller';
import { HashProvider } from '~/common/providers/hash.provider';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthenticateAccountController],
  providers: [AuthenticateAccountService, HashProvider],
})
export class AuthModule {}
