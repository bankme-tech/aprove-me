import { Module } from '@nestjs/common';
import { CreateAssignorUseCase } from './use-cases/create-assignor';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateAssignorUseCase],
  exports: [CreateAssignorUseCase],
})
export class AssignorModule {}
