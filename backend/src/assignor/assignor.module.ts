import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService],
})
export class AssignorModule {}
