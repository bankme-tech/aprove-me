import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { QueueService } from '@infra/queue/services';
import { UseCase } from '@core/shared/contracts/usecases';
import { RegisterPayableUseCase } from '@core/payable/usecases';
import { ProcessBatchPayableInput, ProcessSinglePayableInput } from './types';

@Processor('PROCESS_BATCH_PAYABLE')
@Injectable()
export class ProcessBatchPayableUseCase
  implements UseCase<ProcessBatchPayableInput, void>
{
  private batchId: string;
  private totalJobs: number = 0;
  private errorCount: number = 0;
  private successCount: number = 0;

  constructor(
    private readonly queueService: QueueService,
    private readonly registerPayableUseCase: RegisterPayableUseCase,
  ) {}

  async execute(input: ProcessBatchPayableInput): Promise<void> {
    this.resetCounters();
    const { payables } = input;
    this.totalJobs = payables.length;
    this.batchId = `batch-${Date.now()}`;

    for (const payable of payables) {
      await this.queueService.addProcessBatchPayableJob(payable);
    }
  }

  @Process()
  private async processSinglePayable(job: Job<ProcessSinglePayableInput>) {
    const payable = job.data;
    try {
      const result = await this.registerPayableUseCase.execute(job.data);

      if (!result.containNotifications) {
        this.successCount++;
      } else {
        this.managePaymentAttempts(payable, result.notifications);
      }
    } catch (error) {
      this.errorCount++;
      await this.queueService.addDeadLetterJob({
        ...payable,
        error: error.response,
      });
    }
  }

  private async managePaymentAttempts(
    payable: ProcessSinglePayableInput,
    notifications: any,
  ) {
    if (!payable.attemptsMade) {
      payable.attemptsMade = 1;
    } else if (payable.attemptsMade >= 4) {
      await this.queueService.addDeadLetterJob({
        ...payable,
        notifications: notifications,
      });
      this.errorCount++;
      return;
    } else {
      payable.attemptsMade++;
    }

    await this.queueService.addProcessBatchPayableJob(payable);
  }

  @OnQueueCompleted()
  private onQueueCompleted() {
    if (this.isBatchProcessed()) {
      // enviar email final processamento
      console.log(
        `Lote ${this.batchId} processado: ${this.successCount} sucesso(s) e ${this.errorCount} falha(s).`,
      );
      if (this.errorCount > 0) {
        // enviar email para equipe de desenvolvimento
        console.log(
          `O processamento no lote ${this.batchId}: gerou ${this.errorCount} falhas`,
        );
      }
    }
  }

  private resetCounters(): void {
    this.errorCount = 0;
    this.successCount = 0;
  }

  private isBatchProcessed(): boolean {
    return this.successCount + this.errorCount === this.totalJobs;
  }
}
