import { Module } from '@nestjs/common';
import { CreateAssignorController } from './controllers/create-assignor.controller';
import { DatabaseModule } from '@/database/database.module';
import { AssignorModule } from '@/assignor/assignor.module';

@Module({
  imports: [DatabaseModule, AssignorModule],
  controllers: [CreateAssignorController],
  providers: [],
})
export class HttpModule {}
