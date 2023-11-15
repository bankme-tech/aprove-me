import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './modules/payable/payable.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PayableModule, AssignorModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
