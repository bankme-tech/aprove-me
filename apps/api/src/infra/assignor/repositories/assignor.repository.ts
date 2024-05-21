import {
  Assignor,
  IAssignorConstructor,
} from '@domain/assignor/models/assignor';

export const ASSIGNOR_REPOSITORY = Symbol('__assignor_repository__');

export interface IAssignorRepository {
  create(data: Omit<IAssignorConstructor, 'id'>): Promise<Assignor>;
}
