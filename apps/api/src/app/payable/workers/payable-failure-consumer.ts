import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { PAYABLE_FAILURE_QUEUE } from '../constants/queues';
import { Job } from 'bull';

type FailedJobPayload = {
  value: number;
  emissionDate: string;
  assignorId: string;
  reason: string;
};

@Processor(PAYABLE_FAILURE_QUEUE)
export class PayableFailureConsumerWorker {
  private logger = new Logger(PayableFailureConsumerWorker.name);

  @Process()
  async process(job: Job<FailedJobPayload>) {
    const failedPayload = JSON.stringify(job.data);

    /** TODO: Implementação de envio de e-mails  */

    this.logger.log(
      `[MAIL]: Failure e-mail sent, payload: ${failedPayload}, error: ${job.data.reason}`,
    );
  }
}
