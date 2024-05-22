import { IOption } from '@bankme/monads';

import { Id } from '@bankme/domain';
import { IUserConstructor, User } from '@bankme/domain';

export const USER_REPOSITORY = Symbol('__user_repository__');

export interface IUserRepository {
  create(data: Omit<IUserConstructor, 'id'>): Promise<User>;

  findOneByUsername(username: string): Promise<IOption<User>>;

  findOneById(id: Id): Promise<IOption<User>>;

  delete(user: User): Promise<void>;
}
