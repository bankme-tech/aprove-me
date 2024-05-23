import { PayableEntity } from '../entities/payable.entity';

export abstract class PayableMapper<T> {
  abstract toDomainEntity(data: T): PayableEntity;
  abstract toPersistenceModel(data: PayableEntity): T;
}
