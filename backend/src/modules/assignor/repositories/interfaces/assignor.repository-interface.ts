import type { AssignorEntity } from '../../entities/assignor.entity';

export abstract class IAssignorRepository {
  abstract create(assignor: AssignorEntity): Promise<void>;
  abstract findById(id: string): Promise<AssignorEntity | null>;
  abstract findAll(): Promise<AssignorEntity[]>;
  abstract update(assignor: AssignorEntity): Promise<void>;
  abstract delete(assignor: AssignorEntity): Promise<void>;
}
