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
  FindReceivableByIdUseCase,
  UpdateReceivableUseCase,
} from './use-cases';
import { ReceivableBatchConsumer } from './jobs/receivable-batch.consumer';
import { ReceivableBatchService } from './jobs/receivable-batch.service';

@Module({
  imports: [
    DatabaseModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'receivable-queue',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'meda69@ethereal.email',
          pass: 'GTMKzKXbga7RSzDGcZ',
        },
      },
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
