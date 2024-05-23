import { Module } from '@nestjs/common';
import { AssignorController } from './assignor.controller';
import { CreateAssignorUseCase } from './usecases/create-assignor.usecase';
import { PrismaAssignorRepository } from './repositories/prisma-assignor.repository';
import { IAssignorRepository } from './repositories/assignor.repository.interface';
import { ICreateAssignorUseCase } from './usecases/create-assignor.usecase.interface';
import { AssignorMapper } from './mappers/assignor.mapper.interface';
import { PrismaAssignorMapper } from './mappers/prisma-assignor.mapper';

@Module({
  controllers: [AssignorController],
  providers: [
    {
      provide: AssignorMapper,
      useClass: PrismaAssignorMapper,
    },
    {
      provide: ICreateAssignorUseCase,
      useClass: CreateAssignorUseCase,
    },
    {
      provide: IAssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
  exports: [IAssignorRepository],
})
export class AssignorModule {}
