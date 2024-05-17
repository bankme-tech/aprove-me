import { PayableModule } from './modules/payable/payable.module';
import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/assignor/assignor.module';

@Module({
  imports: [PayableModule, AssignorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
