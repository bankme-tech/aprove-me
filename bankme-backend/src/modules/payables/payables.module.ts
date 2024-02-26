import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { PayablesService } from './payables.service';
import { PayablesRepository } from './payables.repository';
import { PayablesController } from './payables.controller';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendPayablesEmailProducer } from './jobs/payablesBatch.producer';
import { SendPayablesEmailConsumer } from './jobs/payablesBatch.consumer';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('redis_host'),
          port: configService.get<number>('redis_port'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'payablesQueue',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('smtp_host_name'),
          port: configService.get<number>('smtp_port'),
          auth: {
            user: configService.get<string>('smtp_user'),
            pass: configService.get<string>('smtp_pass'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PayablesController],
  providers: [
    PrismaService,
    PayablesService,
    PayablesRepository,
    SendPayablesEmailProducer,
    SendPayablesEmailConsumer,
  ],
  exports: [PayablesService],
})
export class PayablesModule {}
