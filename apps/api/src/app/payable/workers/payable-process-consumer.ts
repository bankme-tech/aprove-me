import { InjectQueue, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import {
  PAYABLE_FAILURE_QUEUE,
  PAYABLE_PROCESS_QUEUE,
} from '../constants/queues';
import { Job, Queue } from 'bull';
import { CreatePayableUseCase } from '../use-cases/create-payable';

type JobPayload = {
  value: number;
  emissionDate: string;
  assignorId: string;
};

type FailedJobPayload = {
  value: number;
  emissionDate: string;
  assignorId: string;
  reason: string;
};

@Processor(PAYABLE_PROCESS_QUEUE)
export class PayableProcessConsumerWorker {
  private logger = new Logger(PayableProcessConsumerWorker.name);

  constructor(
    private createPayable: CreatePayableUseCase,
    @InjectQueue(PAYABLE_FAILURE_QUEUE) private failureQueue: Queue,
  ) {}

  @Process()
  async process(job: Job<JobPayload>) {
    this.logger.log(`Processing job ${job.id}...`);

    const { value, emissionDate, assignorId } = job.data;
    const creationResult = await this.createPayable.execute({
      value,
      assignorId,
      emissionDate,
    });

    if (creationResult.isLeft()) {
      throw new Error(creationResult.value);
    }

    this.logger.log('Done.');
  }

  @OnQueueFailed()
  async onFail(job: Job) {
    const maxRetry = 4;
    const retryAttempts = job.attemptsMade;

    this.logger.log(`Job ${job.id} failed, attempt #${retryAttempts}`);

    if (retryAttempts >= maxRetry) {
      await this.failureQueue.add({
        ...job.data,
        reason: job.failedReason,
      } as FailedJobPayload);

      this.logger.warn(`Job ${job.id} added to failure queue.`);
    }
  }
}
