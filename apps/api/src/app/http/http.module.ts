import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { AssignorModule } from '@/assignor/assignor.module';
import { PayableModule } from '@/payable/payable.module';
import { CreateAssignorController } from './controllers/create-assignor.controller';
import { CreatePayableController } from './controllers/create-payable.controller';
import { GetAssignorByIdController } from './controllers/get-assignor-by-id.controller';
import { DeleteAssignorByIdController } from './controllers/delete-assignor-by-id.controller';
import { UpdateAssignorController } from './controllers/update-assignor.controller';
import { DeletePayableByIdController } from './controllers/delete-payable.controller';
import { GetPayableByIdController } from './controllers/get-payable-by-id.controller';
import { ListPayablesController } from './controllers/list-payables.controller';

@Module({
  imports: [DatabaseModule, AssignorModule, PayableModule],
  controllers: [
    CreateAssignorController,
    CreatePayableController,
    GetAssignorByIdController,
    DeleteAssignorByIdController,
    UpdateAssignorController,
    DeletePayableByIdController,
    GetPayableByIdController,
    ListPayablesController,
  ],
  providers: [],
})
export class HttpModule {}
