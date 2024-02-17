import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { AssignorRepository, ReceivableRepository } from 'src/repositories';
import {
  PrismaAssignorRepository,
  PrismaReceivableRepository,
} from 'src/db/repositories';
import { AssignorController } from './assignor.controller';
import {
  FetchAllAssignorUseCase,
  CreateAssignorUseCase,
  DeleteAssignorUseCase,
  FindAssignorByIdUseCase,
  UpdateAssignorUseCase,
} from './use-cases';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '../env/env.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AssignorController],
  providers: [
    CreateAssignorUseCase,
    FindAssignorByIdUseCase,
    DeleteAssignorUseCase,
    UpdateAssignorUseCase,
    FetchAllAssignorUseCase,
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
export class AssignorModule {}
