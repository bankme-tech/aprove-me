import { Assignor, IAssignorConstructor } from '@bankme/domain';

export const ASSIGNOR_REPOSITORY = Symbol('__assignor_repository__');

export interface IAssignorRepository {
  create(data: Omit<IAssignorConstructor, 'id'>): Promise<Assignor>;
}
