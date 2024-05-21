import { Module } from '@nestjs/common';

import { AssignorController } from 'src/controllers/assignor.controller';
import { AssignorService } from 'src/services/assignor.service';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService],
})
export class ReceivableModule {}
