import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { CreatePayableBodyDTO } from '../dtos/CreatePayableDTO';
import { Process } from '@nestjs/bull';

@Injectable()
export class SendPayablesEmailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('payableJob')
  async sendPayablesEmailJob(job: Job<CreatePayableBodyDTO>) {
    const { data } = job;

    console.log(data);

    await this.mailService.sendMail({
      to: 'figure out email address to send to',
      from: `Bankme Staff`,
      subject: `Bankme Payables Email`,
      text: `
      Success payables batch: ${10} \n
      Failed payables batch: ${10}
      `,
    });
  }
}
