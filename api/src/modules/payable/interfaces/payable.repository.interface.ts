import { IPayable } from './payable.interface';

export interface IPayableRepository {
  create(payable: IPayable): Promise<IPayable>;
}
