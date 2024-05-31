import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

type ContextOptions = {
  total: number;
  success: number;
  failure: number;
};

type MailOption = {
  to : string
  subject : string
  template : string
  context : ContextOptions
}

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendMail(options: MailOption) {
    return this.mailerService.sendMail(options);
  }
}
