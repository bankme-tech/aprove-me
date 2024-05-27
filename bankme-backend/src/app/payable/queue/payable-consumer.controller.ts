import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { DbService } from 'src/db/db.service';
import { EmailService } from 'src/app/mail/mail.service';
import { PayableBatchDto } from '../dto/payable-batch.dto';

@Controller()
export class PayableConsumerController {
  private readonly logger = new Logger(PayableConsumerController.name);

  constructor(
    private readonly db: DbService,
    private readonly emailService: EmailService,
  ) {}

  @EventPattern('payable_queue')
  async handlePayableBatch({ payables, emailTo }: PayableBatchDto) {
    let total = payables.length;
    let successCount = 0;
    let failureCount = 0;

    for (const payable of payables) {
      try {
        this.logger.log(`Processing payable: ${JSON.stringify(payable)}`);
        await this.db.payable.create({ data: payable });
        successCount++;
      } catch (error) {
        this.logger.error(`Failed to process payable: ${payable}`);
        failureCount++;
      }
    }

    this.notify(successCount, failureCount, total, emailTo);
  }

  notify(
    successCount: number,
    failureCount: number,
    total: number,
    email: string,
  ) {
    const to = email;
    const subject = 'payable batch';
    const text = `
    Batch processing complete
    Total received: ${total}
    Total successes: ${successCount}
    Total failures: ${failureCount}
    `;

    this.emailService.sendEmail(to, subject, text);
    this.logger.log(`Sending email to: ${to}`);
  }
}
