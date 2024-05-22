import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from '../shared/config';
import { AssignorModule } from './assignor.module';
import { ReceivableModule } from './receivable.module';
// import { BullModule } from '@nestjs/bull';
// import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.bankmetech.com',
    //     port: 587,
    //     auth: {
    //       user: 'notidy@bankme@tech.com',
    //       pass: 'notidy-password',
    //     },
    //   },
    //   defaults: {
    //     from: '"No Reply" <no-reply@bankme@tech.com>',
    //   },
    // }),
    AssignorModule,
    ReceivableModule,
  ],
})
export class AppModule {}
