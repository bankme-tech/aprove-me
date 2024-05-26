import { Injectable, Logger } from '@nestjs/common';
import { CreatePayableInputDTO } from './dto/create-payable.input.dto';
import { ICreatePayableUseCase } from './usecases/create-payable.usecase.interface';
import { EmailService } from 'src/email/email.service';
import { BatchInputDTO } from './dto/batch.input.dto';
import { IProducer } from 'src/rabbitmq/interfaces/producer.interface';

@Injectable()
export class PayableService {
  private readonly logger = new Logger(PayableService.name);

  constructor(
    private readonly createPayableUseCase: ICreatePayableUseCase,
    private readonly emailService: EmailService,
    private readonly producer: IProducer<BatchInputDTO>,
  ) {}

  async processBatch(
    payables: CreatePayableInputDTO[],
    retries: number = 0,
  ): Promise<void> {
    const batchSize = payables.length;
    this.logger.debug(`Processing batch with ${batchSize} payables`);
    const processed = [];
    try {
      await Promise.all(
        payables.map(async (payable) => {
          try {
            const result = await this.createPayableUseCase.execute(payable);
            processed.push(result);
          } catch (error) {
            await this.publishFailingBatchItem(payable, retries);
            this.logger.debug('Error processing payable', error.stack);
          }
        }),
      );
      if (processed.length === 0) {
        this.logger.debug('All payables failed');
        return;
      }
      await this.sendNotificationEmail(processed);
      this.logger.debug('Batch finished processing');
    } catch (error) {
      this.logger.error('Error processing batch', error.stack);
    }
  }

  private async publishFailingBatchItem(
    payable: CreatePayableInputDTO,
    retries: number,
  ): Promise<void> {
    const payload = { payables: [payable] };
    this.logger.debug('Publishing failing batch item');
    await this.producer.publishMessage(payload, { retries: retries + 1 });
  }

  async sendNotificationEmail(
    payables: CreatePayableInputDTO[],
    failed: boolean = false,
  ): Promise<void> {
    if (failed) {
      await this.sendErrorEmailNotification(payables);
      return;
    }
    await this.sendSuccessEmailNotification(payables);
  }

  private async sendSuccessEmailNotification(
    payload: CreatePayableInputDTO[],
  ): Promise<void> {
    const content = `Batch of ${payload.length} payables processed successfully.\n\n${this.formatPayables(payload)}`;

    await this.emailService.sendEmail({
      to: process.env.EMAIL_TO_ON_SUCCESS,
      subject: 'Payables batch successfully processed',
      content,
    });
    this.logger.debug('Success email notification sent');
  }

  private async sendErrorEmailNotification(
    payload: CreatePayableInputDTO[],
  ): Promise<void> {
    const content = `An error occurred while processing payables batch.\n\n${this.formatPayables(payload)}`;
    await this.emailService.sendEmail({
      to: process.env.EMAIL_TO_ON_ERROR,
      subject: 'Payables batch processing error',
      content,
    });
    this.logger.debug('Error email notification sent');
  }

  private formatPayables(payload: CreatePayableInputDTO[]): string {
    return payload.reduce((acc, payable, index) => {
      return (
        acc +
        `Payable ${index + 1}:\n` +
        ` - Value: ${payable.value}\n` +
        ` - Assignor ID: ${payable.assignorId}\n` +
        ` - Emission Date: ${payable.emissionDate}\n\n`
      );
    }, 'Batch content:\n');
  }
}
