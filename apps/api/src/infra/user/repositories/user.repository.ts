import { IOption } from '@bankme/monads';

import { Id } from '@domain/shared/id';
import { IUserConstructor, User } from '@domain/user/models/user';

export const USER_REPOSITORY = Symbol('__user_repository__');

export interface IUserRepository {
  create(data: Omit<IUserConstructor, 'id'>): Promise<User>;

  save(user: User): Promise<User>;

  findOneByUsername(username: string): Promise<IOption<User>>;

  findOneById(id: Id): Promise<IOption<User>>;

  delete(user: User): Promise<void>;
}
