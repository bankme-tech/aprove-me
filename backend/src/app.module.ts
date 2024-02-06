import { Module } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';

@Module({
  imports: [PayableModule, AssignorModule],
})
export class AppModule {}
