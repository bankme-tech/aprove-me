import {
  InjectQueue,
  OnQueueDrained,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Queue } from 'bullmq';
import { AssignorService } from 'src/assignor/assignor.service';
import { AssignorDto } from 'src/assignor/dto/assignor.dto';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import { SendEmailService } from 'src/send-email/send-mail.service';
import { PayableService } from '../payable.service';

@Processor('payable')
export class PayableConsumer {
  constructor(
    private readonly payableService: PayableService,
    private readonly assignorService: AssignorService,
    @Inject(SendEmailService) private readonly sendEmail: SendEmailService,
    @InjectQueue('payable') private readonly batchQueue: Queue,
  ) {}
  private readonly logger = new Logger(PayableConsumer.name);
  private assignorInfo: AssignorDto;
  private successCount: number = 0;
  private failedCount: number = 0;

  @Process('create')
  async transcode(job: Job<CreatePayableDto>) {
    try {
      this.logger.log(
        `Processing job: ${job.id}, Data: ${JSON.stringify(job.data)}`,
      );
      this.assignorInfo = await this.assignorService.findOne(
        job.data.assignorId,
      );
      await this.payableService.create(job.data);
      this.successCount++;
    } catch (err) {
      this.logger.log(
        `Processing job: ${job.failedReason}, Data: ${JSON.stringify(job.data)}`,
      );
      this.failedCount++;
    }
  }

  @OnQueueDrained()
  async handler() {
    await this.sendEmail.handler({
      name: this.assignorInfo.name,
      email: this.assignorInfo.email,
      subject: 'Job Count',
      text: `fails: ${this.failedCount}
            success: ${this.successCount}`,
    });
    this.failedCount = 0;
    this.successCount = 0;
  }

  @OnQueueFailed()
  async handlerFails() {
    await this.sendEmail.handler({
      name: 'operations team',
      email: 'opertations@operate.com',
      subject: 'Job Count',
      text: `fails: ${this.failedCount}
      `,
    });
  }
}
