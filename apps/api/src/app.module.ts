import { Module } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';

@Module({
  imports: [PayableModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
