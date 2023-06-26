import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BatchConsumerService } from './jobs/batch-consumer.service';
import { BatchProducerService } from './jobs/batch-producer.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[    
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT || '6379'),
      },
    }),
    BullModule.registerQueue({name:'batchQueue'}),
  ],
  controllers: [PayablesController],
  providers: [
    PayablesService,
    PrismaService,
    BatchConsumerService,
    BatchProducerService
  ]
})
export class PayablesModule { }
