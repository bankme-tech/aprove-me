import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { PrismaModule } from '../prisma/prisma.module';
import { AssignorModule } from './assignor/assignor.module';
import { AuthModule } from './auth/auth.module';
import AuthMiddleware from './middlewares/auth.middleware';
import { PayableModule } from './payable/payable.module';
import { QueueModule } from './queue/queue.module';
import { SendEmailModule } from './send-email/send-email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
    PrismaModule,
    PayableModule,
    QueueModule,
    AssignorModule,
    SendEmailModule,
  ],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      '/integrations/payable',
      {
        path: '/integrations/assignor',
        method: RequestMethod.GET,
      },
      {
        path: '/integrations/assignor/*',
        method: RequestMethod.GET,
      },
    );
  }
}
