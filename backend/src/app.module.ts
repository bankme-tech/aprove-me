import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { HealthController } from './app.controller';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    AuthModule,
    PayableModule,
    AssignorModule,
    PrismaModule,
    RabbitMQModule,
    RouterModule.register([
      {
        path: 'integrations',
        children: [
          { path: 'auth', module: AuthModule },
          { path: 'payable', module: PayableModule },
          { path: 'assignor', module: AssignorModule },
          { path: 'user', module: UserModule },
        ],
      },
    ]),
    ClientsModule.register([
      {
        name: 'RMQ',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672/'],
          queue: 'payable-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
