import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

import config from '../shared/config';
import { AssignorModule } from './assignor.module';
import { ReceivableModule } from './receivable.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    AssignorModule,
    ReceivableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
