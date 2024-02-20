import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { PAYABLE_PROCESS_QUEUE } from '../constants/queues';
import { Queue } from 'bull';
import { Either, left, right } from '@util/either';

enum PayableProducerWorkerError {
  ADD_TO_QUEUE_ERROR = 'add_to_queue_error',
}

type PayableProducerWorkerRequest = Array<{
  value: number;
  emissionDate: string;
  assignorId: string;
}>;

type PayableProducerWorkerResponse = Either<PayableProducerWorkerError, null>;

@Injectable()
export class PayableProducerWorker {
  private logger = new Logger(PayableProducerWorker.name);

  constructor(@InjectQueue(PAYABLE_PROCESS_QUEUE) private queue: Queue) {}

  async execute(
    payload: PayableProducerWorkerRequest,
  ): Promise<PayableProducerWorkerResponse> {
    try {
      await this.queue.addBulk(
        payload.map((data) => ({
          data,
          opts: { attempts: 4, backoff: { type: 'exponential', delay: 10000 } },
        })),
      );
    } catch (error) {
      this.logger.error(error);

      return left(PayableProducerWorkerError.ADD_TO_QUEUE_ERROR);
    }

    return right(null);
  }
}
