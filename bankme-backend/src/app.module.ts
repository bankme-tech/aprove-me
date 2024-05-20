import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';
import { validate } from './config/env.validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate
    }),
    DbModule,
    PayableModule,
    AssignorModule,
    UserModule,
    CryptoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
