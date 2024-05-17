import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PayableController],
  providers: [PayableService],
})
export class PayableModule {}
