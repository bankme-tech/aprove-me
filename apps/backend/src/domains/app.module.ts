// Packages
import { Module } from '@nestjs/common';

// Current
import { AppService } from './app/app.service';
import { AppController } from './app/app.controller';

// Domains
import { AuthModule } from './auth/auth.module';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';

@Module({
  imports: [PayableModule, AssignorModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
