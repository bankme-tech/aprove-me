import { Module } from '@nestjs/common';
import { CreateAssignorUseCase } from './use-cases/create-assignor';
import { DatabaseModule } from '@/database/database.module';
import { GetAssignorByIdUseCase } from './use-cases/get-assignor-by-id';
import { DeleteAssignorUseCase } from './use-cases/delete-assignor';
import { UpdateAssignorUseCase } from './use-cases/update-assignor';
import { ListAssignorsUseCase } from './use-cases/list-assignors';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateAssignorUseCase,
    GetAssignorByIdUseCase,
    DeleteAssignorUseCase,
    UpdateAssignorUseCase,
    ListAssignorsUseCase,
  ],
  exports: [
    CreateAssignorUseCase,
    GetAssignorByIdUseCase,
    DeleteAssignorUseCase,
    UpdateAssignorUseCase,
    ListAssignorsUseCase,
  ],
})
export class AssignorModule {}
