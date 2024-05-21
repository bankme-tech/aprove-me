import { IOption } from '@bankme/monads';

import {
  Assignor,
  IAssignorConstructor,
} from '@domain/assignor/models/assignor';
import { Id } from '@domain/shared/id';

export const ASSIGNOR_REPOSITORY = Symbol('__assignor_repository__');

export interface IAssignorRepository {
  create(data: Omit<IAssignorConstructor, 'id'>): Promise<Assignor>;

  save(data: Assignor): Promise<Assignor>;

  findOneById(id: Id): Promise<IOption<Assignor>>;
}
