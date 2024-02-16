import { Module } from '@nestjs/common';
import { CreateAssignorUseCase } from './use-cases/create-assignor';
import { DatabaseModule } from '@/database/database.module';
import { GetAssignorByIdUseCase } from './use-cases/get-assignor-by-id';
import { DeleteAssignorUseCase } from './use-cases/delete-assignor';
import { UpdateAssignorUseCase } from './use-cases/update-assignor';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateAssignorUseCase,
    GetAssignorByIdUseCase,
    DeleteAssignorUseCase,
    UpdateAssignorUseCase,
  ],
  exports: [
    CreateAssignorUseCase,
    GetAssignorByIdUseCase,
    DeleteAssignorUseCase,
    UpdateAssignorUseCase,
  ],
})
export class AssignorModule {}
