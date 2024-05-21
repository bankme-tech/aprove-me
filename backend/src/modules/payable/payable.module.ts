import { Module } from '@nestjs/common';
import { RegisterPayableController } from './controllers/register-payable/register-payable.controller';
import { RegisterPayableService } from './services/register-payable/register-payable.service';
import { DatabaseModule } from '~/database.module';
import { FindPayableByIdController } from './controllers/find-payable-by-id/find-payable-by-id.controller';
import { FindPayableByIdService } from './services/find-payable-by-id/find-payable-by-id.service';
import { GetPayablesService } from './services/get-payables/get-payables.service';
import { DeletePayableService } from './services/delete-payable/delete-payable.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterPayableController, FindPayableByIdController],
  providers: [RegisterPayableService, FindPayableByIdService, GetPayablesService, DeletePayableService],
})
export class PayableModule {}
