import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: 'smtp.mailersend.net',
            port: 587,
            auth: {
              user: 'MS_CmHBpe@trial-3yxj6ljv5yxldo2r.mlsender.net',
              pass: configService.get('EMAIL_PASS_KEY'),
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class MailModule {}
