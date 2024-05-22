import { Module } from '@nestjs/common';
 import { ConfigModule } from '@nestjs/config';

import { PayableModule } from './integrations/payables/payable.module';
import { AssignorModule } from './integrations/assignor/assignor.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }), 
    PayableModule,
    AssignorModule,
    InfrastructureModule,
  ],
})
export class AppModule { }
