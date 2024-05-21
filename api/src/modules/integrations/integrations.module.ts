import { Module } from '@nestjs/common';
import { PayablesRepository } from './domain/repositories/payables.repository';
import { PrismaPayablesRepository } from './infra/database/repositories/prisma-payables.repository';
import { CreatePayableUseCase } from './use-cases/create-payable.use-case';
import { IntegrationsController } from './infra/http/controllers/integrations.controller';

@Module({
  imports: [],
  controllers: [IntegrationsController],
  providers: [
    {
      provide: PayablesRepository,
      useClass: PrismaPayablesRepository,
    },
    CreatePayableUseCase,
  ],
})
export class IntegrationsModule {}
