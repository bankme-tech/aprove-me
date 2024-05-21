import { IOption } from '@bankme/monads';

import { Assignor, IAssignorConstructor } from '@bankme/domain';
import { Id } from '@bankme/domain';

export const ASSIGNOR_REPOSITORY = Symbol('__assignor_repository__');

export interface IAssignorRepository {
  create(data: Omit<IAssignorConstructor, 'id'>): Promise<Assignor>;

  save(data: Assignor): Promise<Assignor>;

  findOneById(id: Id): Promise<IOption<Assignor>>;
}
