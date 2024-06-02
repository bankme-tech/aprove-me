import { Payable } from '@core/payable/model';

export abstract class PayableRepository {
  abstract delete(id: string): Promise<void>;
  abstract save(payable: Payable): Promise<void>;
  abstract findById(id: string): Promise<Payable | null>;
}
