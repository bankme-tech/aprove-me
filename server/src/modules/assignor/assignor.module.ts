import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';

import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService, AssignorRepository]
})
export class AssignorModule {}
