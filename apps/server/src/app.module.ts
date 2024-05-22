import { Module } from '@nestjs/common'
import { PrismaModule } from './database/prisma.module'
import { HealthzModule } from './healthz/healthz.module'

@Module({
  imports: [HealthzModule, PrismaModule],
})
export class AppModule {}
