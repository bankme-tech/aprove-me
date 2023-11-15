import { IPayable } from './payable.interface';

export interface IPayableRepository {
  findAll(): Promise<IPayable[]>;
  findById(id: string): Promise<IPayable>;
  create(payable: IPayable): Promise<IPayable>;
  update(payable: Partial<IPayable>): Promise<IPayable>;
  delete(id: string): Promise<void>;
}
