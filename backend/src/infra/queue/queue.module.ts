import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { QueueService } from '@infra/queue/services';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
        },
        defaultJobOptions: {
          //attempts: 4,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'PROCESS_BATCH_PAYABLE',
    }),
    BullModule.registerQueue({
      name: 'DEAD_LETTER_QUEUE',
    }),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
