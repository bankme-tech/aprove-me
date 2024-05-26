import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PayableModule } from './integrations/payable/payables.module'
import { PayableController } from './integrations/payable/payable.controller'
import { PayableService } from './integrations/payable/payables.service'
import { RouterModule } from '@nestjs/core'
import { AssignorModule } from './integrations/assignor/assignors.module'
import { AssignorService } from './integrations/assignor/assignors.service'
import {
  AssignorController
} from './integrations/assignor/assignors.controller'
import { JwtMiddleware } from './integrations/shared/jwt.middleware'
import { AuthModule } from './integrations/auth/auth.module'

@Module({
  imports: [
    AuthModule,
    PayableService,
    AssignorService,
    RouterModule.register([
      {
        path: 'integrations',
        module: PayableModule
      },
      {
        path: 'integrations',
        module: AssignorModule
      }
    ])
  ],
  controllers: [AppController, PayableController, AssignorController],
  providers: [AppService, PayableService, AssignorService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude('integrations/auth')
      .forRoutes('*')
  }
}
