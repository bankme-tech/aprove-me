import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrismaAssignorRepository } from './infra/repository/prisma-assignor.repository';
import { DatabaseModule } from './infra/database/database.module';

import { PayableController } from './application/payable.controller';
import { PayableUsecase } from './application/payable.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [PayableController],
  providers: [
    {
      provide: 'IAssignorRepository',
      useClass: PrismaAssignorRepository
    },
    {
      provide: PayableUsecase,
      useFactory: (assignorRepo: PrismaAssignorRepository) => new PayableUsecase(assignorRepo),
      inject: ['IAssignorRepository'],
    },
  ],
})
export class AppModule { }
