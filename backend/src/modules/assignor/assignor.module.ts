import { Module } from '@nestjs/common';
import { RegisterAssignorService } from './services/register-assignor/register-assignor.service';
import { RegisterAssignorController } from './controllers/register-assignor/register-assignor.controller';
import { DatabaseModule } from '~/database.module';
import { FindAssignorByIdService } from './services/find-assignor-by-id/find-assignor-by-id.service';
import { FindAssignorByIdController } from './controllers/find-assignor-by-id/find-assignor-by-id.controller';
import { GetAssignorsService } from './services/get-assignors/get-assignors.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterAssignorController, FindAssignorByIdController],
  providers: [
    RegisterAssignorService,
    FindAssignorByIdService,
    GetAssignorsService,
  ],
})
export class AssignorModule {}
