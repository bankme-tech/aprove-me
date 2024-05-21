import { Module } from '@nestjs/common';
import { PayablesRepository } from './domain/repositories/payables.repository';
import { PrismaPayablesRepository } from './infra/database/repositories/prisma-payables.repository';
import { CreatePayableUseCase } from './use-cases/create-payable.use-case';
import { IntegrationsController } from './infra/http/controllers/integrations.controller';
import { AssignorsRepository } from './domain/repositories/assignors.repository';
import { PrismaAssignorsRepository } from './infra/database/repositories/prisma-assignors.repository';
import { CreateAssignorUseCase } from './use-cases/create-assignor.use-case';
import { FindPayableByIdUseCase } from './use-cases/find-payable-by-id.use-case';

@Module({
  imports: [],
  controllers: [IntegrationsController],
  providers: [
    {
      provide: PayablesRepository,
      useClass: PrismaPayablesRepository,
    },
    {
      provide: AssignorsRepository,
      useClass: PrismaAssignorsRepository,
    },
    CreatePayableUseCase,
    CreateAssignorUseCase,
    FindPayableByIdUseCase,
  ],
})
export class IntegrationsModule {}
