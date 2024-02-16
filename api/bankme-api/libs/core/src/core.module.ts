import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { Success } from './messages/success';

@Module({
  providers: [CoreService, Success],
  exports: [CoreService, Success],
})
export class CoreModule {}
