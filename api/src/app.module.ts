import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './modules/payable/payable.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { UsersModule } from './modules/users/users.module';
import { WorkerModule } from './modules/worker/worker.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PayableModule,
    AssignorModule,
    AuthModule,
    UsersModule,
    WorkerModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
