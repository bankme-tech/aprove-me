import { IPayableConstructor, Id, Payable } from '@bankme/domain';
import { IOption } from '@bankme/monads';

import { IPageQuery } from '@domain/shared/page-query.interface';
import { IPage } from '@domain/shared/page.interface';

export const PAYABLE_REPOSITORY = Symbol('__payable_repository__');

export interface IPayableRepository {
  create(payableData: Omit<IPayableConstructor, 'id'>): Promise<Payable>;

  save(data: Payable): Promise<Payable>;

  findOneById(id: Id): Promise<IOption<Payable>>;

  find(query: IPageQuery): Promise<IPage<Payable>>;

  delete(payable: Payable): Promise<void>;
}
