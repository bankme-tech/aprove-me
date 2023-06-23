import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PayableModule } from './modules/payable/payable.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AssignorModule, PayableModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
