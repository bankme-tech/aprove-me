import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreatePayableDto } from '../dto/payable.dto';
import { DbService } from 'src/db/db.service';
import { EmailService } from 'src/app/mail/mail.service';

@Controller()
export class PayableConsumerController {
  private readonly logger = new Logger(PayableConsumerController.name);

  constructor(
    private readonly db: DbService,
    private readonly emailService: EmailService,
  ) {}

  @EventPattern('payable_queue')
  async handlePayableBatch(payables: CreatePayableDto[]) {
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

    return this.notify(successCount, failureCount, total);
  }

  notify(successCount: number, failureCount: number, total: number) {
    const to = 'example@mail.com';
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
