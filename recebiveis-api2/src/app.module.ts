import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './payable/payable.module';
import { PrismaModule } from './prisma/prisma.module';
import { AssignorModule } from './assignor/assignor.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BatchService } from './batch/batch.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PayableModule,
    PrismaModule,
    AssignorModule,
    AuthModule,
    UsersModule,
    ClientsModule.register([
      {
        name: 'PAYABLE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'batch_payables',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, BatchService],
})
export class AppModule {}
