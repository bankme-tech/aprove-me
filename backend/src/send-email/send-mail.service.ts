import { Inject, Injectable } from '@nestjs/common';
import nodemailer, { SentMessageInfo } from 'nodemailer';

import { SendEmailProvider } from './send-email.provider';

type SendEmailHandler = {
  name: string;
  email: string;
  subject: string;
  text: string;
};

@Injectable()
export class SendEmailService {
  constructor(
    @Inject(SendEmailProvider.provide)
    private readonly sendEmailProvider: nodemailer.Transporter<SentMessageInfo>,
  ) {}

  async handler({ name, email, subject, text }: SendEmailHandler) {
    await this.sendEmailProvider.sendMail({
      from: '"Dan Miranda 👻" <danmiranda@example.com>',
      to: email,
      subject: subject,
      text: text,
      html: `<b>Hello ${name}</b>`,
    });
  }
}
