import { UserEntity } from '../entities/user.entity';

export abstract class IUserMapper<T> {
  abstract toDomainEntity(data: T): UserEntity;
  abstract toPersistenceModel(data: UserEntity): T;
}
