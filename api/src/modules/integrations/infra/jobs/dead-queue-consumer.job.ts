import { IUseCase } from '@/core/use-cases/interfaces';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('dead-queue')
export class DeadQueueConsumerJob implements IUseCase {
  constructor(private mailService: MailerService) {}

  @Process('dead-job')
  public async execute(job: Job<string>) {
    try {
      await this.mailService.sendMail({
        to: 'darron.williamson95@ethereal.email',
        from: 'Bankme Team',
        subject: `Payable creation failed, job: ${job.data}`,
        text: 'It was not possible to create payable, job',
      });
    } catch (error) {
      console.error(error);
    }
  }
}
