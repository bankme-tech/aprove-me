import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  sendEmail(email: string, subject: string, message: string) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: subject,
      html: message,
    });
  }
}
