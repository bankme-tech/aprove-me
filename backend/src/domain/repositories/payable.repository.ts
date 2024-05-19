import { Payable } from '../entities/payable.entity';

export interface PayableRepository {
  create(payable: Payable): Promise<Payable>;
  findById(id: string): Promise<Payable | null>;
  update(id: string, payable: Payable): Promise<Payable>;
  delete(id: string): Promise<void>;
}