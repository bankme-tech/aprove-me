import { Injectable } from '@nestjs/common';
import { Either, left, right } from '~/common/utils/either';
import { InjectQueue } from '@nestjs/bull';
import { QueuesName } from '~/common/types/queues';
import { Queue } from 'bull';
import { BadRequest } from '~/common/exceptions/bad-request.exception';
import { PayableJob } from '~/common/types/payable.types';
import { randomUUID } from 'crypto';

interface RequestData {
  payables: PayableJob[];
}

type ResponseData = Either<Error, true>;

@Injectable()
export class RegisterBatchPayableService {
  private MAX_PAYABLE_BATCH = 10000;

  constructor(
    @InjectQueue(QueuesName.PAYABLE) private queue: Queue<PayableJob>,
  ) {}

  async execute({ payables }: RequestData): Promise<ResponseData> {
    if (payables.length > this.MAX_PAYABLE_BATCH) {
      return left(
        new BadRequest(
          `You must be provide a batch until ${this.MAX_PAYABLE_BATCH} payables.`,
        ),
      );
    }

    await this.queue.addBulk(
      payables.map((payable, idx) => ({
        name: `${randomUUID()}.${idx}`,
        data: payable,
      })),
    );

    return right(true);
  }
}
