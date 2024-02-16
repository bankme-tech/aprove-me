import { Module } from '@nestjs/common';
import { CreateAssignorController } from './controllers/create-assignor.controller';
import { CreatePayableController } from './controllers/create-payable.controller';
import { GetAssignorByIdController } from './controllers/get-assignor-by-id.controller';
import { DatabaseModule } from '@/database/database.module';
import { AssignorModule } from '@/assignor/assignor.module';
import { PayableModule } from '@/payable/payable.module';
import { DeleteAssignorByIdController } from './controllers/delete-assignor-by-id.controller';

@Module({
  imports: [DatabaseModule, AssignorModule, PayableModule],
  controllers: [
    CreateAssignorController,
    CreatePayableController,
    GetAssignorByIdController,
    DeleteAssignorByIdController,
  ],
  providers: [],
})
export class HttpModule {}
