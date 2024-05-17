import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AssignorController],
  providers: [AssignorService],
})
export class AssignorModule {}
