import { AddNewAssignor } from '@/app/use-cases/assignor/add-new-assignor';
import { DeleteAssignor } from '@/app/use-cases/assignor/delete-assignor';
import { EditAssignor } from '@/app/use-cases/assignor/edit-assignor';
import { FindAssignorById } from '@/app/use-cases/assignor/find-assignor-by-id';
import { AddNewPayable } from '@/app/use-cases/payable/add-new-payable';
import { DeletePayable } from '@/app/use-cases/payable/delete-payable';
import { EditPayable } from '@/app/use-cases/payable/edit-payable';
import { FindPayableById } from '@/app/use-cases/payable/find-payable-by-id';
import { AddNewUser } from '@/app/use-cases/user/add-new-user';
import { DatabaseModule } from '@/infra/database/database.module';
import { AssignorController } from '@/infra/http/controllers/assignor.controller';
import { PayableController } from '@/infra/http/controllers/payable.controller';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';

const assignorUseCases = [
  AddNewAssignor,
  FindAssignorById,
  EditAssignor,
  DeleteAssignor,
];

const payableUseCases = [
  AddNewPayable,
  FindPayableById,
  EditPayable,
  DeletePayable,
];

const userUseCases = [AddNewUser];

@Module({
  imports: [DatabaseModule],
  providers: [...assignorUseCases, ...payableUseCases, ...userUseCases],
  controllers: [PayableController, AssignorController, UserController],
})
export class HttpModule {}
