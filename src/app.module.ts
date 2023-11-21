import { Module } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PayableModule, AuthModule],
})
export class AppModule {}
