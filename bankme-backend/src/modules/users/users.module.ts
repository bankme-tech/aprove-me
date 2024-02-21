import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prismaService';
import { UserRepository } from './users.repository';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMailProducerService } from './jobs/sendMail.producer';
import { SendMailConsumer } from './jobs/sendMail.consumer';

// TODO: use .env instead of hardcoded params
@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: "mailQueue"
    }),
    // Works hardcoded but not with .env
    MailerModule.forRoot({
      transport: {
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "eugene55@ethereal.email",
          pass: "rYkdhNJWCnT2waxgn2",
        },
      },
    }),
  ],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UserRepository, SendMailProducerService, SendMailConsumer],
  exports: [UsersService, BullModule],
})
export class UsersModule {}
