import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Inject, Injectable } from '@nestjs/common';
import { CreateReceivableBatchDto, CreateReceivableDto } from 'src/domain/dtos';

@Injectable()
export class ReceivableBatchService {
  constructor(@InjectQueue('receivable-queue') private queue: Queue) {}

  async createReceivable(createReceivableDto: CreateReceivableDto) {
    this.queue.add('create-receivable-job', createReceivableDto);
  }
}
