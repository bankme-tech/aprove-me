import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { CreateAssignorUseCase } from './use-cases/create-assignor-usecase';
import { AssignorRepository, ReceivableRepository } from 'src/repositories';
import {
  PrismaAssignorRepository,
  PrismaReceivableRepository,
} from 'src/db/repositories';
import { AssignorController } from './assignor.controller';
import { FindAssignorByIdUseCase } from './use-cases';
import { DeleteAssignorUseCase } from './use-cases/delete-assignor-usecase';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '../env/env.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AssignorController],
  providers: [
    CreateAssignorUseCase,
    FindAssignorByIdUseCase,
    DeleteAssignorUseCase,
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
