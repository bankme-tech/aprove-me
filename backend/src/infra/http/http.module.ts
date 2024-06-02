import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database';

import {
  DeletePayableUseCase,
  GetPayableUseCase,
  ProcessBatchPayableUseCase,
  RegisterPayableUseCase,
} from '@core/payable/usecases';
import { AssignorRepository } from '@core/assignor/ports/repository';
import { PayableRepository } from '@core/payable/ports/repository';
import {
  RegisterAssignorController,
  EditAssignorController,
  DeleteAssignorController,
  GetAssignorController,
} from '@infra/http/adapters/controllers/assignor';
import {
  RegisterAssignorUseCase,
  EditAssignorUseCase,
  DeleteAssignorUseCase,
  GetAssignorUseCase,
} from '@core/assignor/usecases';
import {
  DeletePayableController,
  GetPayableController,
  ProcessBatchPayableController,
  RegisterPayableController,
} from './adapters/controllers/payable';
import { AuthController } from './adapters/controllers/auth';
import {
  AuthenticateUseCase,
  RegisterPermissionUseCase,
} from '@core/auth/usecases';
import { AuthModule } from '@infra/auth';
import { QueueModule } from '@infra/queue';
import { SignToken, PermissionRepository } from '@core/auth/ports';
import { QueueService } from '@infra/queue/services';
import { RegisterPermissionController } from './adapters/controllers/permission';

@Module({
  imports: [DatabaseModule, AuthModule, QueueModule],
  providers: [
    {
      provide: RegisterAssignorUseCase,
      useFactory: (
        assignorRepository: AssignorRepository,
      ): RegisterAssignorUseCase =>
        new RegisterAssignorUseCase(assignorRepository),
      inject: [AssignorRepository],
    },
    {
      provide: EditAssignorUseCase,
      useFactory: (
        assignorRepository: AssignorRepository,
      ): EditAssignorUseCase => new EditAssignorUseCase(assignorRepository),
      inject: [AssignorRepository],
    },
    {
      provide: DeleteAssignorUseCase,
      useFactory: (
        assignorRepository: AssignorRepository,
      ): DeleteAssignorUseCase => new DeleteAssignorUseCase(assignorRepository),
      inject: [AssignorRepository],
    },
    {
      provide: GetAssignorUseCase,
      useFactory: (
        assignorRepository: AssignorRepository,
      ): GetAssignorUseCase => new GetAssignorUseCase(assignorRepository),
      inject: [AssignorRepository],
    },
    {
      provide: RegisterPayableUseCase,
      useFactory: (
        payableRepository: PayableRepository,
        assignorRepository: AssignorRepository,
      ): RegisterPayableUseCase =>
        new RegisterPayableUseCase(payableRepository, assignorRepository),
      inject: [PayableRepository, AssignorRepository],
    },
    {
      provide: GetPayableUseCase,
      useFactory: (payableRepository: PayableRepository): GetPayableUseCase =>
        new GetPayableUseCase(payableRepository),
      inject: [PayableRepository],
    },
    {
      provide: DeletePayableUseCase,
      useFactory: (
        payableRepository: PayableRepository,
      ): DeletePayableUseCase => new DeletePayableUseCase(payableRepository),
      inject: [PayableRepository],
    },
    {
      provide: AuthenticateUseCase,
      useFactory: (
        permissionRepository: PermissionRepository,
        token: SignToken,
      ): AuthenticateUseCase =>
        new AuthenticateUseCase(permissionRepository, token),
      inject: [PermissionRepository, SignToken],
    },
    {
      provide: RegisterPermissionUseCase,
      useFactory: (
        permissionRepository: PermissionRepository,
      ): RegisterPermissionUseCase =>
        new RegisterPermissionUseCase(permissionRepository),
      inject: [PermissionRepository],
    },
    {
      provide: ProcessBatchPayableUseCase,
      useFactory: (
        queueService: QueueService,
        registerPayableUseCase: RegisterPayableUseCase,
      ): ProcessBatchPayableUseCase =>
        new ProcessBatchPayableUseCase(queueService, registerPayableUseCase),
      inject: [QueueService, RegisterPayableUseCase],
    },
  ],
  controllers: [
    RegisterAssignorController,
    EditAssignorController,
    DeleteAssignorController,
    RegisterPayableController,
    GetAssignorController,
    GetPayableController,
    DeletePayableController,
    AuthController,
    ProcessBatchPayableController,
    RegisterPermissionController,
  ],
})
export class HttpModule {}
