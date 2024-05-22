import { AssignorEntity } from '../entities/assignor.entity';

export type CreateAssignorOutputDTO = Pick<
  AssignorEntity,
  'id' | 'document' | 'email' | 'phone' | 'name'
>;
