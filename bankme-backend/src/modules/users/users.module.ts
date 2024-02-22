import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prismaService';
import { UserRepository } from './users.repository';
import { BullModule } from '@nestjs/bull';
import { SendMailProducerService } from './jobs/sendMail.producer';
import { SendMailConsumer } from './jobs/sendMail.consumer';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
      name: 'mailQueue',
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
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    UserRepository,
    SendMailProducerService,
    SendMailConsumer,
  ],
  exports: [UsersService, BullModule],
})
export class UsersModule {}
