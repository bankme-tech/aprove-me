import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignorModule } from './assignor/assignor.module';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './config';
import { PayableModule } from './payable/payable.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      isGlobal: true,
    }),
    AssignorModule,
    AuthModule,
    PayableModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
