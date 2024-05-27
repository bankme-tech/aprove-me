import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '../db/db.module';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { UserModule } from './user/user.module';
import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from 'src/app/mail/mail.module';
import { validate } from '../config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DbModule,
    PayableModule,
    AssignorModule,
    UserModule,
    CryptoModule,
    AuthModule,
    MailModule
  ],
})
export class AppModule {}
