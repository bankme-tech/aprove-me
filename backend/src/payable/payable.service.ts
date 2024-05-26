import { Injectable, Logger } from '@nestjs/common';
import { CreatePayableInputDTO } from './dto/create-payable.input.dto';
import { ICreatePayableUseCase } from './usecases/create-payable.usecase.interface';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PayableService {
  private readonly logger = new Logger(PayableService.name);

  constructor(
    private readonly createPayableUseCase: ICreatePayableUseCase,
    private readonly emailService: EmailService,
  ) {}

  async processBatch(payables: CreatePayableInputDTO[]): Promise<void> {
    const batchSize = payables.length;
    this.logger.debug(`Processing batch with ${batchSize} payables`);
    let processed = 0;
    let failed = 0;
    try {
      await Promise.all(
        payables.map(async (payable) => {
          try {
            await this.createPayableUseCase.execute(payable);
            processed++;
          } catch (error) {
            this.logger.debug(
              `Error processing payable. Error: ${error.message}`,
            );
            failed++;
          }
        }),
      );

      await this.sendEmailNotification(batchSize, processed, failed);
      this.logger.debug('Batch successfully processed');
    } catch (error) {
      this.logger.error('Error processing batch', error.stack);
      throw error;
    }
  }

  private async sendEmailNotification(
    batchSize: number,
    processed: number,
    failed: number,
  ): Promise<void> {
    const result = `Batch of ${batchSize} payables processed with ${processed} successful payables and ${failed} failed payables`;

    await this.emailService.sendEmail({
      to: process.env.EMAIL_TO,
      subject: 'Payables batch successfully processed',
      content: result,
    });
    this.logger.debug('Email notification sent with batch result');
  }
}
