import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  sendEmail(email: string, subject: string, message: string) {
    const resend = new Resend('re_XBnN1Kfz_2ucemvbqgMA8uDxghPq2wJQE');

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: subject,
      html: message,
    });
  }
}
