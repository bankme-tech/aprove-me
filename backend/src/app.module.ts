import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { ResponseInterceptor } from './app.interceptors';
import { AppService } from './app.service';
import { AssignorModule } from './modules/assignor/assignor/assignor.module';
import { PayableModule } from './modules/payable/payable.module';

@Module({
  imports: [PayableModule, AssignorModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
