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

@Module({
  imports: [DatabaseModule],
  controllers: [ReceivableController],
  providers: [
    FindReceivableByIdUseCase,
    CreateReceivableUseCase,
    UpdateReceivableUseCase,
    DeleteReceivableUseCase,
    EnvService,
    JwtService,
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
