import { Payable } from '../entities/payable.entity';
import { PayableVO } from '../vos/payable.vo';

export interface IPayableDomainService {
  create(data: PayableVO): Promise<Payable | string>;
  changeById(id: string, data: PayableVO): Promise<Payable>;
  removeById(id: string): Promise<PayableVO>;
}
