import { Module } from '@nestjs/common';
import { CreatePayableController } from './controllers/create-payable.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateAssignorUseCase } from 'src/domain/operations/application/use-cases/assignors/use-cases/create-assignor';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CreatePayableController
  ],
  providers: [
    CreateAssignorUseCase
  ]
})
export class HttpModule {}
