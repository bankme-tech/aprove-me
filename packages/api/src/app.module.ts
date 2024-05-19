import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { constants } from '@configs/constants';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PayableModule } from './payable/payable.module';
import { PrismaService } from './database/prisma.service';
import { AssignorModule } from './assignor/assignor.module';
import { DatabaseModule } from './database/database.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PayableModule,
    DatabaseModule,
    AssignorModule,
    RabbitMQModule,
    ClientsModule.register([
      {
        name: 'RMQ',
        transport: Transport.RMQ,
        options: {
          urls: [constants.RmqUrl],
          queue: 'payable-queue',
        },
      },
    ]),
    RouterModule.register([
      {
        path: 'integrations',
        children: [
          { path: 'user', module: UserModule },
          { path: 'auth', module: AuthModule },
          { path: 'payable', module: PayableModule },
          { path: 'assignor', module: AssignorModule },
        ],
      },
    ]),
  ],
  providers: [PrismaService],
})
export class AppModule {}
