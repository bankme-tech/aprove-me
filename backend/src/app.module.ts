import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './payable/payable.module';

@Module({
  imports: [PayableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
