import { Module } from '@nestjs/common';
import { PayablesModule } from './integrations/payables/payable.module';
import { AssignorModule } from './integrations/assignor/assignor.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [PayablesModule, AssignorModule, InfrastructureModule],
})
export class AppModule { }
