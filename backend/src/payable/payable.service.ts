import { Injectable, Logger } from '@nestjs/common';
import { CreatePayableInputDTO } from './dto/create-payable.input.dto';
import { ICreatePayableUseCase } from './usecases/create-payable.usecase.interface';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PayableService {
  constructor(
    private readonly createPayableUseCase: ICreatePayableUseCase,
    private readonly emailService: EmailService,
  ) {}

  async processBatch(payables: CreatePayableInputDTO[]): Promise<void> {
    const batchSize = payables.length;
    Logger.log(
      `Processing batch with ${batchSize} payables`,
      PayableService.name,
    );
    let processed = 0;
    let failed = 0;
    try {
      await Promise.all(
        payables.map(async (payable) => {
          try {
            await this.createPayableUseCase.execute(payable);
            processed++;
          } catch (error) {
            Logger.error(
              `Error processing payable from batch. Error: ${error.message}`,
              PayableService.name,
            );
            failed++;
          }
        }),
      );

      const result = `Batch of ${batchSize} payables processed with ${processed} successful payables and ${failed} failed payables`;

      await this.emailService.sendEmail({
        to: process.env.EMAIL_TO,
        subject: 'Payables batch successfully processed',
        content: result,
      });
      Logger.log('Batch successfully processed', PayableService);
    } catch (error) {
      Logger.error('Error processing batch', PayableService.name);
      throw error;
    }
  }
}
