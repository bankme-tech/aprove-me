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
import { PayableUsecase } from './application/payable.usecase';

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
        new PrismaAssignorRepository(prisma),
      inject: [PrismaClient],
    },
    {
      provide: PayableUsecase,
      useFactory: (
        assignorRepo: PrismaAssignorRepository,
        receivableRepo: PrismaReceivableRepository
      ) => new PayableUsecase(assignorRepo, receivableRepo),
      inject: ['IAssignorRepository', 'IReceivableRepository'],
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
