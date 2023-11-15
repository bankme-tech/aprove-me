import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './modules/payable/payable.module';
import { AssignorModule } from './modules/assignor/assignor.module';

@Module({
  imports: [PayableModule, AssignorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
