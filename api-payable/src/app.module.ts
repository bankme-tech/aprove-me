import { Module } from '@nestjs/common';
        // .send(payloadCredentials);
import { ConfigModule } from '@nestjs/config';
import { PayableModule } from './integrations/payables/payable.module';
import { AssignorModule } from './integrations/assignor/assignor.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AuthModule } from './integrations/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    PayableModule,
    AssignorModule,
    AuthModule,
    InfrastructureModule,
  ],
})
export class AppModule {}
