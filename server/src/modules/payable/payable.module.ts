import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';

import { PayableRepository } from '../../data/repositories/payable-repository/payable-repository';
import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';

@Module({
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, AssignorRepository]
})
export class PayableModule {}
