import { IPayableConstructor, Payable } from '@domain/payable/models/payable';

export const PAYABLE_REPOSITORY = Symbol('__payable_repository__');

export interface IPayableRepository {
  create(payableData: Omit<IPayableConstructor, 'id'>): Promise<Payable>;
}
