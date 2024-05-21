import { Module } from '@nestjs/common';
import { ReceivableController } from 'src/controllers/receivable.controller';

import { AssignorService } from 'src/services/assignor.service';

@Module({
  controllers: [ReceivableController],
  providers: [AssignorService],
})
export class AssignorModule {}
