import { Module } from '@nestjs/common'
import { AssignorsModule } from './assignors/assignors.module'
import { PrismaModule } from './database/prisma.module'
import { HealthzModule } from './healthz/healthz.module'
import { PayableModule } from './payable/payable.module'

@Module({
  imports: [HealthzModule, PrismaModule, AssignorsModule, PayableModule],
})
export class AppModule {}
