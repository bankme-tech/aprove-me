import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PayableModule } from './payable/payable.module';
import { PrismaModule } from './persistence/prisma.module';
import { AssignorModule } from './assignor/assignor.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    PayableModule,
    AssignorModule,
    AuthModule,
    UserModule,
    RabbitMQModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
