import { IJob } from '@/core/jobs/interfaces';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from '../http/dtos/create-payable.dto';

@Injectable()
export class CreatePayableProducerJob implements IJob {
  constructor(@InjectQueue('create-payable-queue') private queue: Queue) {}

  public async execute(createPayableDto: CreatePayableDto) {
    this.queue.add('create-payable-job', createPayableDto);
  }
}
