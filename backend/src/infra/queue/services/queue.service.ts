import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

type PayableWithAttempts = {
  assignor: string;
  value: number;
  attemptsMade: number;
  notifications?: { [key: string]: string[] };
  error?: Error;
};

type Payable = {
  assignor: string;
  value: number;
};

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('PROCESS_BATCH_PAYABLE')
    private readonly processBatchPayableQueue: Queue<Payable>,
    @InjectQueue('DEAD_LETTER_QUEUE')
    private readonly deadLetterQueue: Queue<PayableWithAttempts>,
  ) {}

  async addProcessBatchPayableJob(data: Payable) {
    await this.processBatchPayableQueue.add(data);
  }

  async addDeadLetterJob(data: PayableWithAttempts) {
    await this.deadLetterQueue.add(data);
  }
}
