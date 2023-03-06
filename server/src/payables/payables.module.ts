import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PayableController } from './payables.controller';
import { PayableService } from './payables.service';
import { RmqModule } from '../rmq/rmq.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_PAYABLE_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule.register({
      name: 'PAYABLE',
    }),
  ],
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
})
export class PayableModule {}
