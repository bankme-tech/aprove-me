import { Payable } from '../entities/payable.entity';
import { PayableVO } from '../vos/payable.vo';

export interface IPayableDomainService {
  validate(data: PayableVO): string[];
  create(data: PayableVO): Promise<Payable>;
  changeById(id: string, data: PayableVO): Promise<Payable>;
  removeById(id: string): Promise<PayableVO>;
  getAll(): Promise<PayableVO[]>;
}
