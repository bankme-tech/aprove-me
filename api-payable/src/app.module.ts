import { Module } from '@nestjs/common';
import { PayablesModule } from './integrations/payables/payable.module';
import { AssignorModule } from './integrations/assignor/assignor.module';

@Module({
  imports: [PayablesModule, AssignorModule],
})
export class AppModule { }
