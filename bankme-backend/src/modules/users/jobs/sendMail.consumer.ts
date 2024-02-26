import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { CreateUserBodyDTO } from '../dtos/CreateUserDTO';
import { Job } from 'bull';

@Processor('mailQueue')
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('mailJob')
  async sendMailJob(job: Job<CreateUserBodyDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: `Bankme Staff <testBankme@tech.com>`,
      subject: `Bankme Welcome Email`,
      text: `<h1>Hello! ${data.name}, your account at Bankme has been created!<h1/>`,
    });
  }
}
