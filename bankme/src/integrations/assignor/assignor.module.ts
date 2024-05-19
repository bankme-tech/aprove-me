import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import AssignorRepository from './assignor.repository';
import ValidateBodyMiddleware from './middleware/validateBody.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [AssignorController],
  providers: [AssignorService, AssignorRepository],
  exports: [AssignorService],
})
export class AssignorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateBodyMiddleware)
      .forRoutes({ path: 'integrations/assignor', method: RequestMethod.POST });
  }
}
