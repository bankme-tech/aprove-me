import { Module } from '@nestjs/common';
import { AssignorController } from './assignor.controller';
import { CreateAssignorUseCase } from './usecases/create-assignor.usecase';
import { PrismaAssignorRepository } from './repositories/prisma-assignor.repository';
import { IAssignorRepository } from './repositories/assignor.repository.interface';
import { ICreateAssignorUseCase } from './usecases/create-assignor.usecase.interface';
import { AssignorMapper } from './mappers/assignor.mapper.interface';
import { PrismaAssignorMapper } from './mappers/prisma-assignor.mapper';
import { IFindAllAssignorsUseCase } from './usecases/find-all-assignors.usecase.interface';
import { FindAllAssignorsUseCase } from './usecases/find-all-assignors.usecase';
import { IFindAssignorUseCase } from './usecases/find-assignor.usecase.interface';
import { FindAssignorUseCase } from './usecases/find-assignor.usecase';

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
      provide: IFindAllAssignorsUseCase,
      useClass: FindAllAssignorsUseCase,
    },
    {
      provide: IFindAssignorUseCase,
      useClass: FindAssignorUseCase,
    },
    {
      provide: IAssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
  exports: [IAssignorRepository],
})
export class AssignorModule {}
