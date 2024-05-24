import { AssignorRepository } from '@/assignors/repository/assignor.repository'
import { env } from '@/environments'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { PayableController } from './payable.controller'
import { PayableService } from './payable.service'
import { PayableRepository } from './repository/payable.repository'

@Module({
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, AssignorRepository],
  exports: [PayableService],
  imports: [
    BullModule.registerQueue({
      name: 'process-data',
      redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      },
      defaultJobOptions: {
        delay: 2_000,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1_000,
        },
      },
      limiter: {
        max: 200,
        duration: 15 * 1000, // 15 seconds
      },
    }),
  ],
})
export class PayableModule {}
