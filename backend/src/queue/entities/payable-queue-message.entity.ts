import { CreatePayableDto } from '../../payables/dto/create.payable.dto';

export enum QueueMessageStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export class PayableQueueMessage {
  batchId: string;
  payable: CreatePayableDto;
  private _retryCount?: number = 0;
  status?: QueueMessageStatus = QueueMessageStatus.PENDING;

  constructor(batchId: string, payable: CreatePayableDto) {
    this.batchId = batchId;
    this.payable = payable;
  }

  incrementRetryCount() {
    this._retryCount += 1;
  }

  get retryCount() {
    return this._retryCount;
  }
}
