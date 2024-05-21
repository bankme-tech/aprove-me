import { IPayableConstructor, Id, Payable } from '@bankme/domain';
import { IOption } from '@bankme/monads';

export const PAYABLE_REPOSITORY = Symbol('__payable_repository__');

export interface IPayableRepository {
  create(payableData: Omit<IPayableConstructor, 'id'>): Promise<Payable>;

  save(data: Payable): Promise<Payable>;

  findOneById(id: Id): Promise<IOption<Payable>>;

  delete(payable: Payable): Promise<void>;
}
