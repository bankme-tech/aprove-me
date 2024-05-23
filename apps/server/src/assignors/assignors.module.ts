import { Module } from '@nestjs/common'
import { AssignorsController } from './assignors.controller'
import { AssignorsService } from './assignors.service'
import { AssignorRepository } from './repository/assignor.repository'

@Module({
  controllers: [AssignorsController],
  imports: [],
  providers: [AssignorsService, AssignorRepository],
})
export class AssignorsModule {}
