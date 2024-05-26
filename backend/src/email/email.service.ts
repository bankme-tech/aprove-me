import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export type EmailOptions = {
  to: string;
  subject: string;
  content: string;
};

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailOptions: EmailOptions): Promise<void> {
    await this.mailerService.sendMail({
      to: emailOptions.to,
      subject: emailOptions.subject,
      text: emailOptions.content,
    });
  }
}
