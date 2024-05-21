import { Module } from '@nestjs/common';
import { RegisterAssignorService } from './services/register-assignor/register-assignor.service';
import { RegisterAssignorController } from './controllers/register-assignor/register-assignor.controller';
import { DatabaseModule } from '~/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterAssignorController],
  providers: [RegisterAssignorService],
})
export class AssignorModule {}
