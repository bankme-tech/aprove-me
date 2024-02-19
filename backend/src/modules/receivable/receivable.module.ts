import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/db/database.module';
import {
  PrismaAssignorRepository,
  PrismaReceivableRepository,
} from 'src/db/repositories';
import { AssignorRepository, ReceivableRepository } from 'src/repositories';
import { EnvService } from '../env/env.service';
import { ReceivableController } from './receivable.controller';
import {
  CreateReceivableUseCase,
  DeleteReceivableUseCase,
  FetchAllReceivableUseCase,
  FindReceivableByIdUseCase,
  UpdateReceivableUseCase,
} from './use-cases';
import { ReceivableBatchConsumer } from './jobs/receivable-batch.consumer';
import { ReceivableBatchService } from './jobs/receivable-batch.service';
import { RECEIVABLE_QUEUE } from './constants';
import { EnvModule } from '../env/env.module';
import { env } from 'process';

@Module({
  imports: [
    DatabaseModule,
    BullModule.forRootAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        redis: {
          host: envService.get('REDIS_HOST'),
          port: envService.get('REDIS_PORT'),
        },
      }),
      inject: [EnvService],
    }),
    BullModule.registerQueue({
      name: RECEIVABLE_QUEUE,
    }),
    MailerModule.forRootAsync({
      inject: [EnvService],
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        transport: {
          host: envService.get('MAIL_HOST'),
          port: envService.get('MAIL_PORT'),
          auth: {
            user: envService.get('MAIL_AUTH_USER'),
            pass: envService.get('MAIL_AUTH_USER_PASSWORD'),
          },
        },
      }),
    }),
  ],
  controllers: [ReceivableController],
  providers: [
    FindReceivableByIdUseCase,
    CreateReceivableUseCase,
    UpdateReceivableUseCase,
    DeleteReceivableUseCase,
    EnvService,
    JwtService,
    ReceivableBatchConsumer,
    ReceivableBatchService,
    FetchAllReceivableUseCase,
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
    {
      provide: ReceivableRepository,
      useClass: PrismaReceivableRepository,
    },
  ],
})
export class ReceivableModule {}
