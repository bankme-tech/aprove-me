import { Module } from '@nestjs/common';
import { PayablesController } from './payable.controller';
import { PayablesService } from './payable.service';

@Module({
  controllers: [PayablesController],
  providers: [PayablesService],
  // exports: [PayablesService],
})
export class PayablesModule { }
