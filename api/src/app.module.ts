import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/assignor/assignor.module';
import { AdminModule } from './modules/admin/admin.module';
import { ReceivableModule } from './modules/receivable/receivable.module';
import { AppController } from './app.controller';


@Module({
  imports: [AssignorModule, AdminModule, ReceivableModule],
  controllers: [],
  providers: [],
})
export class AppModule {}