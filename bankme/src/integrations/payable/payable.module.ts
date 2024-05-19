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

@Module({
  imports: [AssignorModule, PrismaModule],
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
