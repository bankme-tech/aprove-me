import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './repositories/user/user.module';
import { PayableModule } from './repositories/payable/payable.module';
import { AssignorModule } from './repositories/assignor/assignor.module';
import { SecurityModule } from './auth/security.module';

@Module({
  imports: [
    AssignorModule,
    PayableModule,
    UserModule,
    AuthModule,
    PassportModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
