// Packages
import { Module } from '@nestjs/common';

// Current
import { AppService } from './app/app.service';
import { AppController } from './app/app.controller';

// Domains
import { AuthModule } from './auth/auth.module';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [PayableModule, AssignorModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
