import { PayableJob } from '~/common/types/payable.types';

export class NotificationFailurePayableBatchEvent {
  public payable: PayableJob;

  constructor(payable: PayableJob) {
    this.payable = payable;
  }
}
