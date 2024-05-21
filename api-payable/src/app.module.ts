import { Module } from '@nestjs/common';
import { PayablesModule } from './payables/payables.module';
import { AssignorModule } from './assignor/assignor.module';

@Module({
  imports: [PayablesModule, AssignorModule],
})
export class AppModule {}
