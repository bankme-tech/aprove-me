import { AddNewAssignor } from '@/app/use-cases/assignor/add-new-assignor';
import { EditAssignor } from '@/app/use-cases/assignor/edit-assignor';
import { FindAssignorById } from '@/app/use-cases/assignor/find-assignor-by-id';
import { AddNewPayable } from '@/app/use-cases/payable/add-new-payable';
import { FindPayableById } from '@/app/use-cases/payable/find-payable-by-id';
import { DatabaseModule } from '@/infra/database/database.module';
import { AssignorController } from '@/infra/http/controllers/assignor.controller';
import { PayableController } from '@/infra/http/controllers/payable.controller';
import { Module } from '@nestjs/common';

const assignorUseCases = [AddNewAssignor, FindAssignorById];
const assignorUseCases = [
  AddNewAssignor,
  FindAssignorById,
  EditAssignor,
];

const payableUseCases = [AddNewPayable, FindPayableById];

@Module({
  imports: [DatabaseModule],
  providers: [...assignorUseCases, ...payableUseCases],
  controllers: [PayableController, AssignorController],
})
export class HttpModule { }
export class HttpModule {}
