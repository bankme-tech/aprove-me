import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtMiddleware } from 'src/shared/middlewares/jwt.middleware';

@Module({
  imports: [],
  controllers: [AssignorController],
  providers: [AssignorService],
})
export class AssignorModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('integrations/assignor');
  }
}
