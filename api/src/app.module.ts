import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './payable/payable.module';
import { PrismaModule } from './db/prisma.module';
import { AssignorModule } from './assignor/assignor.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroservicesModule } from './microservices/microservices.module';

@Module({
  imports: [
    PayableModule,
    PrismaModule,
    AssignorModule,
    AuthModule,
    UsersModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:rabbitmq@rabbitmq:5672'],
          queue: 'payable_queue',
          queueOptions: {
            durable: true,
          },
          noAck: false,
        },
      },
    ]),
    MicroservicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
