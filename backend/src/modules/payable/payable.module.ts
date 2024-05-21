import { Module } from '@nestjs/common';
import { RegisterPayableController } from './controllers/register-payable/register-payable.controller';
import { RegisterPayableService } from './services/register-payable/register-payable.service';
import { DatabaseModule } from '~/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterPayableController],
  providers: [RegisterPayableService],
})
export class PayableModule {}
