import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, PayableModule, AssignorModule, UserModule, CryptoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
