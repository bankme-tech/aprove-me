import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from 'src/constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: authConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
