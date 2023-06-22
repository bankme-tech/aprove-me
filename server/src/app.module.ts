import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PayableModule } from './modules/payable/payable.module';

@Module({
  imports: [AssignorModule, PayableModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
