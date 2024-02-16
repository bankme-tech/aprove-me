import { Module } from '@nestjs/common';
import { CreateAssignorController } from './controllers/create-assignor.controller';
import { CreatePayableController } from './controllers/create-payable.controller';
import { DatabaseModule } from '@/database/database.module';
import { AssignorModule } from '@/assignor/assignor.module';
import { PayableModule } from '@/payable/payable.module';

@Module({
  imports: [DatabaseModule, AssignorModule, PayableModule],
  controllers: [CreateAssignorController, CreatePayableController],
  providers: [],
})
export class HttpModule {}
