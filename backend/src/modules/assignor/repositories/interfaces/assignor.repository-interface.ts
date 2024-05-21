import type { AssignorPersistence } from '~/common/types/assignor.types';
import type { AssignorEntity } from '../../entities/assignor.entity';

export abstract class IAssignorRepository {
  abstract create(assignor: AssignorEntity): Promise<AssignorPersistence>;
}
