import { AssignorEntity } from '../entities/assignor.entity';

export abstract class IAssignorMapper<T> {
  abstract toDomainEntity(data: T): AssignorEntity;
  abstract toPersistenceModel(data: AssignorEntity): T;
}
