import { AssignorRepository } from '@/assignors/repository/assignor.repository'
import { Module } from '@nestjs/common'
import { PayableController } from './payable.controller'
import { PayableService } from './payable.service'
import { PayableRepository } from './repository/payable.repository'

@Module({
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, AssignorRepository],
})
export class PayableModule {}
