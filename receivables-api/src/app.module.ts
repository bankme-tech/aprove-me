import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableController } from './payable/controllers/payable.controller';

@Module({
  imports: [],
  controllers: [AppController, PayableController],
  providers: [AppService],
})
export class AppModule {}
