import { Module } from '@nestjs/common';
import { AssignorController } from './assignor.controller';
import { CreateAssignorUseCase } from './usecases/create-assignor.usecase';
import { PrismaAssignorRepository } from './repositories/prisma-assignor.repository';
import { IAssignorRepository } from './repositories/assignor.repository.interface';
import { ICreateAssignorUseCase } from './usecases/create-assignor.usecase.interface';
import { IAssignorMapper } from './mappers/assignor.mapper.interface';
import { PrismaAssignorMapper } from './mappers/prisma-assignor.mapper';
import { IFindAllAssignorsUseCase } from './usecases/find-all-assignors.usecase.interface';
import { FindAllAssignorsUseCase } from './usecases/find-all-assignors.usecase';
import { IFindAssignorUseCase } from './usecases/find-assignor.usecase.interface';
import { FindAssignorUseCase } from './usecases/find-assignor.usecase';
import { IUpdateAssignorUseCase } from './usecases/update-assignor.usecase.interface';
import { UpdateAssignorUseCase } from './usecases/update-assignor.usecase';
import { IRemoveAssignorUseCase } from './usecases/remove-assignor.usecase.interface';
import { RemoveAssignorUseCase } from './usecases/remove-assignor-usecase';

@Module({
  controllers: [AssignorController],
  providers: [
    {
      provide: IAssignorMapper,
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
      provide: IUpdateAssignorUseCase,
      useClass: UpdateAssignorUseCase,
    },
    {
      provide: IRemoveAssignorUseCase,
      useClass: RemoveAssignorUseCase,
    },
    {
      provide: IAssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
  exports: [IAssignorRepository],
})
export class AssignorModule {}
