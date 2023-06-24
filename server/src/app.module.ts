import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PayableModule } from './modules/payable/payable.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AssignorModule, 
    PayableModule, 
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
