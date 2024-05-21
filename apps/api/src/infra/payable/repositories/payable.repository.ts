import { IOption } from '@bankme/monads';

import { IPayableConstructor, Payable } from '@domain/payable/models/payable';
import { Id } from '@domain/shared/id';

export const PAYABLE_REPOSITORY = Symbol('__payable_repository__');

export interface IPayableRepository {
  create(payableData: Omit<IPayableConstructor, 'id'>): Promise<Payable>;

  save(data: Payable): Promise<Payable>;

  findOneById(id: Id): Promise<IOption<Payable>>;
}
