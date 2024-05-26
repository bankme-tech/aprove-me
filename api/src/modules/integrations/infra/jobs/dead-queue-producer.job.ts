import { IJob } from '@/core/jobs/interfaces';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeadQueueProducerJob implements IJob {
  constructor(@InjectQueue('dead-queue') private queue: Queue) {}

  public async execute(id: string) {
    this.queue.add('dead-job', id);
  }
}
