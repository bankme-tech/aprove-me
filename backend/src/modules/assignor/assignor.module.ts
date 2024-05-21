import { Module } from '@nestjs/common';
import { RegisterAssignorService } from './services/register-assignor/register-assignor.service';
import { RegisterAssignorController } from './controllers/register-assignor/register-assignor.controller';
import { DatabaseModule } from '~/database.module';
import { FindAssignorByIdService } from './services/find-assignor-by-id/find-assignor-by-id.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterAssignorController],
  providers: [RegisterAssignorService, FindAssignorByIdService],
})
export class AssignorModule {}
