import { Module } from '@nestjs/common';
import { CreatePayableController } from './controllers/create-payable.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateAssignorUseCase } from 'src/domain/operations/application/use-cases/assignors/use-cases/create-assignor';
import { CreateReceivableUseCase } from 'src/domain/operations/application/use-cases/recivables/use-cases/create-receivable';
import { EditAssignorUseCase } from 'src/domain/operations/application/use-cases/assignors/use-cases/edit-assignor';
import { DeleteAssignorUseCase } from 'src/domain/operations/application/use-cases/assignors/use-cases/delete-assignor';
import { GetAssignorUseCase } from 'src/domain/operations/application/use-cases/assignors/use-cases/get-assignor';
import { EditReceivableUseCase } from 'src/domain/operations/application/use-cases/recivables/use-cases/edit-receivable';
import { DeleteReceivableUseCase } from 'src/domain/operations/application/use-cases/recivables/use-cases/delete-receivable';
import { GetReceivableUseCase } from 'src/domain/operations/application/use-cases/recivables/use-cases/get-receivable';
import { GetPayableController } from './controllers/get-payable.controller';
import { GetAssignorController } from './controllers/get-assignor.controller';
import { CreateAssignorController } from './controllers/create-assignor.controller';
import { CreateOnlyPayableController } from './controllers/create-only-payable';
import { EditAssignorController } from './controllers/edit-assignor.controller';
import { EditRecevableController } from './controllers/edit-payable.controller';
import { DeleteAssignorController } from './controllers/delete-assignor.controller';
import { DeleteReceivableController } from './controllers/delete-payable.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateAccountUseCase } from 'src/domain/operations/application/use-cases/authentication/use-cases/create-account';
import { AuthenticateAccountUseCase } from 'src/domain/operations/application/use-cases/authentication/use-cases/authenticate';
import { AuthenticateController } from './controllers/authenticate.controller';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CreatePayableController,
    CreateAssignorController,
    CreateOnlyPayableController,
    CreateAccountController,

    AuthenticateController,

    EditAssignorController,
    EditRecevableController,

    DeleteAssignorController,
    DeleteReceivableController,

    GetPayableController,
    GetAssignorController
  ],
  providers: [
    CreateAssignorUseCase,
    EditAssignorUseCase,
    DeleteAssignorUseCase,
    GetAssignorUseCase,

    CreateReceivableUseCase,
    EditReceivableUseCase,
    DeleteReceivableUseCase,
    GetReceivableUseCase,

    CreateAccountUseCase,
    AuthenticateAccountUseCase
  ]
})
export class HttpModule {}
