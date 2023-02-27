import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { PayableModule } from './payables/payables.module';
import { AssignorModule } from './assignors/assignor.module';

@Module({
  imports: [AuthModule, PayableModule, AssignorModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
