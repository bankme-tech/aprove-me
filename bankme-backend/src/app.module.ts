import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, PayableModule, AssignorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
