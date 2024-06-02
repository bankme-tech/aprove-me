import { Payable } from '@core/payable/model';

export abstract class PayableQueue {
  abstract add(queueName: string, data: any): Promise<void>;
}
