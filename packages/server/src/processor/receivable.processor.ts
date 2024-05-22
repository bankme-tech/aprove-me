import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { ReceivableService } from 'src/services/receivable.service';
import { receivableBodyDto } from 'src/dtos/receivable.dto';

@Processor('receivables')
export class ReceivablesProcessor {
  private readonly receivablesService: ReceivableService;
  private readonly mailerService: MailerService;
  constructor(receivablesService: ReceivableService, mailerService: MailerService) {
    this.receivablesService = receivablesService;
    this.mailerService = mailerService;
  }

  @Process()
  async handleBatch(job: Job<receivableBodyDto[]>, clientEmail: string) {
    const receivables = job.data;
    let successCount = 0;
    let failureCount = 0;

    for (const receivable of receivables) {
      try {
        const response = await this.receivablesService.create_receivable(receivable);
        if (response.isOk()) {
          successCount++;
        } else {
          failureCount++;
        }
      } catch (error) {
        failureCount++;
      }
    }

    this.sendNotification(clientEmail, successCount, failureCount);
  }
  async sendNotification(clientEmail: string, successCount: number, failureCount: number) {
    await this.mailerService.sendMail({
      to: clientEmail,
      subject: 'Batch Processing Completed',
      text: `Batch processing completed. Success: ${successCount}, Failures: ${failureCount}`,
    });
  }
}
