import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { PrismaAssignorRepository } from './infra/repository/prisma-assignor.repository';
import { PrismaReceivableRepository } from './infra/repository/prisma-receivable.repository';
import { DatabaseModule } from './infra/database/database.module';

import { PayableController } from './application/payable.controller';
import { CreatePayableUsecase } from './application/create-payable.usecase';
import { GetPayableUsecase } from './application/get-payable.usecase';
import { GetAssignorUsecase } from './application/get-assignor.usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [PayableController],
  providers: [
    {
      provide: 'IAssignorRepository',
      useFactory: (prisma: PrismaClient) =>
        new PrismaAssignorRepository(prisma),
      inject: [PrismaClient],
    },
    {
      provide: 'IReceivableRepository',
      useFactory: (prisma: PrismaClient) =>
        new PrismaReceivableRepository(prisma),
      inject: [PrismaClient],
    },
    {
      provide: CreatePayableUsecase,
      useFactory: (
        assignorRepo: PrismaAssignorRepository,
        receivableRepo: PrismaReceivableRepository
      ) => new CreatePayableUsecase(assignorRepo, receivableRepo),
      inject: ['IAssignorRepository', 'IReceivableRepository'],
    },
    {
      provide: GetPayableUsecase,
      useFactory: (receivableRepo: PrismaReceivableRepository) =>
        new GetPayableUsecase(receivableRepo),
      inject: ['IReceivableRepository'],
    },
    {
      provide: GetAssignorUsecase,
      useFactory: (assignorRepo: PrismaAssignorRepository) =>
        new GetAssignorUsecase(assignorRepo),
      inject: ['IAssignorRepository'],
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
