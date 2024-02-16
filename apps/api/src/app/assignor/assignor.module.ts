import { Module } from '@nestjs/common';
import { CreateAssignorUseCase } from './use-cases/create-assignor';
import { DatabaseModule } from '@/database/database.module';
import { GetAssignorByIdUseCase } from './use-cases/get-assignor-by-id';

@Module({
  imports: [DatabaseModule],
  providers: [CreateAssignorUseCase, GetAssignorByIdUseCase],
  exports: [CreateAssignorUseCase, GetAssignorByIdUseCase],
})
export class AssignorModule {}
