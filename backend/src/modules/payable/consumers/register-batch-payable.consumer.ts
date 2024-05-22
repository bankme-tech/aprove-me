import {
  Process,
  Processor,
  OnQueueFailed,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';
import { PayableJob } from '~/common/types/payable.types';
import { QueuesName } from '~/common/types/queues';
import { RegisterPayableService } from '../services/register-payable/register-payable.service';

@Processor(QueuesName.PAYABLE)
export class RegisterBatchPayableConsumer {
  constructor(private service: RegisterPayableService) {}

  @Process()
  async process(job: Job<PayableJob>) {
    await job.takeLock();

    const result = await this.service.execute(job.data);

    if (result.isLeft()) {
      // Will retry again before move if possible
      await job.moveToFailed({ message: result.value.message });
      return;
    }

    await job.moveToCompleted();
  }

  @OnQueueCompleted()
  async isCompletedBatch(job: Job<PayableJob>) {
    const [prefix] = job.name.split('.');

    const nextJobs = await job.queue.getWaiting();

    const hasJobFromSameBatch = nextJobs.some(
      (j) => j.name.startsWith(prefix) && j.id !== job.id,
    );

    if (hasJobFromSameBatch) return;

    // TODO: Implements event to send email
    return true;
  }

  @OnQueueFailed()
  async onFailure(job: Job<PayableJob>) {
    // TODO: Implements event to send email to developer team
    console.log('failed job', job);
  }
}
