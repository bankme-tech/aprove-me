import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './modules/payable/payable.module';
import { PayableService } from './payable/payable.service';

@Module({
  imports: [PayableModule],
  controllers: [AppController],
  providers: [AppService, PayableService],
})
export class AppModule {}
