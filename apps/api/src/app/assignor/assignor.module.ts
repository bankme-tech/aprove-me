import { Module } from '@nestjs/common';
import { CreateAssignorUseCase } from './use-cases/create-assignor';
import { DatabaseModule } from '@/database/database.module';
import { GetAssignorByIdUseCase } from './use-cases/get-assignor-by-id';
import { DeleteAssignorUseCase } from './use-cases/delete-assignor';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateAssignorUseCase,
    GetAssignorByIdUseCase,
    DeleteAssignorUseCase,
  ],
  exports: [
    CreateAssignorUseCase,
    GetAssignorByIdUseCase,
    DeleteAssignorUseCase,
  ],
})
export class AssignorModule {}
