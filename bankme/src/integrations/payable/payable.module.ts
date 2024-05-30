import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { AssignorModule } from '../assignor/assignor.module';
import { PrismaModule } from '../../prisma/prisma.module';
import PayableRepository from './payable.repository';
import ValidateBodyMiddleware from './middleware/validateBody.middleware';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AssignorModule,
    PrismaModule,
    ClientsModule.register([
      {
        name: 'PAYABLE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672'],
          queue: 'payable_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [PayableController],
  providers: [PayableService, PayableRepository],
})
export class PayableModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateBodyMiddleware)
      .forRoutes({ path: 'integrations/payable', method: RequestMethod.POST });
  }
}
