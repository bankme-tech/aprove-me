import { Module } from '@nestjs/common';
import { SessionManagerService } from './session-manager.service';

@Module({
  providers: [SessionManagerService],
  exports: [SessionManagerService],
})
export class SessionModule {}
