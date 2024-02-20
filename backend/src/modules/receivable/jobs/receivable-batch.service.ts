import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { CreateReceivableBatchDto } from 'src/domain/dtos';

@Injectable()
export class ReceivableBatchService {
  constructor(@InjectQueue('receivable-queue') private queue: Queue) {}

  async createReceivable(createReceivableDto: CreateReceivableBatchDto) {
    await this.queue.add('create-receivable-job', createReceivableDto);
  }
}
