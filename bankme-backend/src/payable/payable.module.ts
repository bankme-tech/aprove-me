import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AssignorModule } from 'src/assignor/assignor.module';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PayableRepository } from './payable.repository';

@Module({
  imports: [DbModule, AssignorModule],
  controllers: [PayableController],
  providers: [PayableService, PayableRepository]
})
export class PayableModule {}
