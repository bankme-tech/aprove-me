import { Module } from '@nestjs/common';
import { PayablesRepository } from './domain/repositories/payables.repository';
import { PrismaPayablesRepository } from './infra/database/repositories/prisma-payables.repository';
import { CreatePayableUseCase } from './use-cases/create-payable.use-case';
import { AssignorsRepository } from './domain/repositories/assignors.repository';
import { PrismaAssignorsRepository } from './infra/database/repositories/prisma-assignors.repository';
import { CreateAssignorUseCase } from './use-cases/create-assignor.use-case';
import { FindPayableByIdUseCase } from './use-cases/find-payable-by-id.use-case';
import { FindAssignorByIdUseCase } from './use-cases/find-assignor-by-id.use-case';
import { PatchPayableUseCase } from './use-cases/patch-payable.use-case';
import { PatchAssignorUseCase } from './use-cases/patch-assignor.use-case';
import { DeletePayableUseCase } from './use-cases/delete-payable.use-case';
import { DeleteAssignorUseCase } from './use-cases/delete-assignor.use-case';
import { FindAssignorByEmailCase } from './use-cases/find-assignor-by-email.use-case';
import { AuthUserUseCase } from './use-cases/auth-user.use-case';
import { PrismaUsersRepository } from './infra/database/repositories/prisma-users.repository';
import { UsersRepository } from './domain/repositories/users.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindUserByLoginUseCase } from './use-cases/find-user-by-login.use-case';
import { CreatePayableProducerJob } from './infra/jobs/create-payable-producer.job';
import { CreatePayablesBatchUseCase } from './use-cases/create-payables-batch.use-case';
import { CreatePayableConsumerJob } from './infra/jobs/create-payable-consumer.job';
import { BullModule } from '@nestjs/bull';
import { AssignorsController } from './infra/http/controllers/assignors.controller';
import { PayablesController } from './infra/http/controllers/payables.controller';
import { AuthController } from './infra/http/controllers/auth.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'create-payable-queue',
    }),
  ],
  controllers: [AssignorsController, PayablesController, AuthController],
  providers: [
    {
      provide: PayablesRepository,
      useClass: PrismaPayablesRepository,
    },
    {
      provide: AssignorsRepository,
      useClass: PrismaAssignorsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    CreatePayableUseCase,
    CreateAssignorUseCase,
    FindPayableByIdUseCase,
    FindAssignorByIdUseCase,
    PatchPayableUseCase,
    PatchAssignorUseCase,
    DeletePayableUseCase,
    DeleteAssignorUseCase,
    FindAssignorByEmailCase,
    AuthUserUseCase,
    CreateUserUseCase,
    FindUserByLoginUseCase,
    CreatePayablesBatchUseCase,
    CreatePayableProducerJob,
    CreatePayableConsumerJob,
  ],
})
export class IntegrationsModule {}
