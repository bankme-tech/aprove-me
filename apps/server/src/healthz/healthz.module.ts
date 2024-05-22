import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthzController } from './healthz.controller'

@Module({
  controllers: [HealthzController],
  imports: [TerminusModule],
})
export class HealthzModule {}
