import { Assignor } from '../entities/assignor.entity';
import { PayableVO } from '../vos/payable.vo';

export interface IAssignorDomainService {
  validate(data: PayableVO): string[];
  create(data: PayableVO): Promise<Payable>;
  changeById(id: string, data: PayableVO): Promise<Payable>;
  removeById(id: string): Promise<PayableVO>;
  getAll(): Promise<PayableVO[]>;
}
