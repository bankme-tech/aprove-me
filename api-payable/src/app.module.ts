import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PayableModule } from './integrations/payables/payable.module';
import { AssignorModule } from './integrations/assignor/assignor.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AuthModule } from './integrations/auth/auth.module';
import { RabbitMQModule } from './microservices/rmq/rabbitmq.module';
import { EmailModule } from './services/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    PayableModule,
    AssignorModule,
    AuthModule,
    RabbitMQModule,
    InfrastructureModule,
    EmailModule,
  ],
})
export class AppModule { }
