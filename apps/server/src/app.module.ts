import { Module } from '@nestjs/common'
import { HealthzModule } from './healthz/healthz.module'

@Module({
  imports: [HealthzModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
