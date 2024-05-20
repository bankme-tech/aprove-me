import { Module } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { PrismaService } from './database/prisma.service';
import { PrismaModule } from './database/prisma.module';
import { AssignorModule } from './assignor/assignor.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    PayableModule,
    AssignorModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    RabbitmqModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
