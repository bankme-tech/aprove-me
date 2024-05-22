import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PayableModule } from './payable/payable.module';

@Module({
  imports: [PayableModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
