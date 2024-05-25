import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SendEmailModule } from 'src/send-email/send-email.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payable',
    }),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    SendEmailModule,
  ],
  exports: [BullModule],
})
export class QueueModule {}
