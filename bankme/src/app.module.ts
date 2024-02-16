import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceivableController } from './receivable/receivable.controller';
import { ReceivableService } from './receivable/receivable.service';

@Module({
  imports: [],
  controllers: [AppController, ReceivableController],
  providers: [AppService, ReceivableService],
})

export class AppModule {}
