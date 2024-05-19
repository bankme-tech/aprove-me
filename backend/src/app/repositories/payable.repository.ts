import { Payable } from '@/app/entities/payable';

export abstract class PayableRepository {
  abstract create(payable: Payable): Promise<Payable>;
  abstract findById(payableId: string): Promise<Payable | null>;
}
