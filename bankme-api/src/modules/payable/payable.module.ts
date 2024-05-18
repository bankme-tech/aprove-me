import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
/*
https://docs.nestjs.com/modules
*/

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtMiddleware } from 'src/shared/middlewares/jwt.middleware';

@Module({
  imports: [],
  controllers: [PayableController],
  providers: [PayableService],
})
export class PayableModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('integrations/payable');
  }
}
