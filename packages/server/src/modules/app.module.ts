import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
})
export class AppModule {}
