import { Module } from '@nestjs/common';
import { AssignorController } from './assignors.controller';

@Module({
  controllers: [AssignorController],
})
export class AssignorModule {}