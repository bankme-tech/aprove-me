import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string) {
    return this.mailerService.sendMail({
      to,
      subject,
      text,
      from: 'MS_CmHBpe@trial-3yxj6ljv5yxldo2r.mlsender.net',
    });
  }
}
