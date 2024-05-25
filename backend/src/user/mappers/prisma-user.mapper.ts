import { User } from '@prisma/client';
import { UUID } from 'crypto';
import { IUserMapper } from './user.mapper.interface';
import { UserEntity } from '../entities/user.entity';

export class PrismaUserMapper extends IUserMapper<User> {
  toDomainEntity(data: User): UserEntity {
    return new UserEntity(data.id as UUID, data.login, data.password);
  }

  toPersistenceModel(data: UserEntity): User {
    return {
      id: data.id as string,
      login: data.login,
      password: data.password,
    };
  }
}
