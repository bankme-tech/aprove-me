import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(options: { email: string; subject: string; html: string }) {
    try {
      const message = {
        to: options.email,
        subject: options.subject,
        html: options.html,
      };

      console.log(message);

      return message;

      //works only with a valid email account
      // const emailSend = await this.mailerService.sendMail({
      //   ...message,
      // });
    } catch (error) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
