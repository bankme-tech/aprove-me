import { IUseCase } from '@/core/use-cases/interfaces';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreatePayableDto } from '../http/dtos/create-payable.dto';
import { CreatePayableUseCase } from '../../use-cases/create-payable.use-case';
import { MailerService } from '@nestjs-modules/mailer';
import { DeadQueueProducerJob } from './dead-queue-producer.job';

@Processor('create-payable-queue')
export class CreatePayableConsumerJob implements IUseCase {
  constructor(
    private createPayableUseCase: CreatePayableUseCase,
    private mailService: MailerService,
    private deadQueueProducerJob: DeadQueueProducerJob,
  ) {}

  @Process('create-payable-job')
  public async execute(job: Job<CreatePayableDto>) {
    for (let i = 0; i < 4; i++) {
      try {
        await this.createPayableUseCase.execute(job.data);

        return;
      } catch (error) {
        console.error(`Job ${job.id} failed`);
      }
    }
    this.deadQueueProducerJob.execute(job.id.toString());
    /* this.mailService.sendMail({
      to: 'darron.williamson95@ethereal.email',
      from: 'Bankme Team',
      subject: 'Payable creation failed',
      text: 'It was not possible to create your payable with the following informations',
    }); */
  }
}
