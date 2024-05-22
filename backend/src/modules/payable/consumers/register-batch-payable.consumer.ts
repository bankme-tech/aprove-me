import {
  Process,
  Processor,
  OnQueueFailed,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { PayableJob } from '~/common/types/payable.types';
import { QueuesName } from '~/common/types/queues';
import { RegisterPayableService } from '../services/register-payable/register-payable.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationsName } from '~/common/types/events';
import { NotificationSuccessPayableBatchEvent } from '~/modules/notification/events/notification-success-payable-batch.event';
import { NotificationFailurePayableBatchEvent } from '~/modules/notification/events/notification-failure-payable-batch.event';

@Processor(QueuesName.PAYABLE)
export class RegisterBatchPayableConsumer {
  constructor(
    private service: RegisterPayableService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Process()
  async process(job: Job<PayableJob>) {
    await job.takeLock();

    const result = await this.service.execute(job.data);

    if (result.isLeft()) {
      // Will retry again before move if possible
      await job.moveToFailed({ message: result.value.message });
      return;
    }

    await job.moveToCompleted(result.value.id);
  }

  @OnQueueCompleted()
  async isCompletedBatch(job: Job<PayableJob>) {
    const [prefix] = job.name.split('.');

    const nextJobs = await job.queue.getWaiting();

    const hasJobFromSameBatch = nextJobs.some(
      (j) => j.name.startsWith(prefix) && j.id !== job.id,
    );

    if (hasJobFromSameBatch) return;

    /**
     * In a big application might save the prefixes in a KV DB
     * is more recommend to increase the performance of many items.
     */
    const completedJobs = await this.countCompletedJobsFromBatch(
      job.queue,
      prefix,
    );
    const failedJobs = await this.countFailedJobsFromBatch(job.queue, prefix);

    this.eventEmitter.emit(
      NotificationsName.SUCCESS_PAYABLE_BATCH,
      new NotificationSuccessPayableBatchEvent(
        completedJobs,
        failedJobs,
        job.data.assignorId,
      ),
    );
  }

  @OnQueueFailed()
  async onFailure(job: Job<PayableJob>) {
    // TODO: Implements event to send email to developer team
    this.eventEmitter.emit(
      NotificationsName.FAILURE_PAYABLE_BATCH,
      new NotificationFailurePayableBatchEvent(job.data),
    );
  }

  private async countCompletedJobsFromBatch(
    queue: Queue<PayableJob>,
    prefix: string,
  ) {
    const jobs = await queue.getCompleted();
    return jobs.filter((job) => job.name.startsWith(prefix)).length;
  }

  private async countFailedJobsFromBatch(
    queue: Queue<PayableJob>,
    prefix: string,
  ) {
    const jobs = await queue.getFailed();
    return jobs.filter((job) => job.name.startsWith(prefix)).length;
  }
}
