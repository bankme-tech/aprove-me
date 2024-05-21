import { ForbiddenException, Injectable } from '@nestjs/common';

import { IOption } from '@bankme/monads';

import { User } from '@domain/user/models/user';

function _throwForbiddenException(): never {
  throw new ForbiddenException(
    "You don't have the required permissions to get this user",
  );
}

function _can(currentUser: IOption<User>, user: User): boolean {
  return currentUser.map((curUser) => curUser.id === user.id).unwrapOr(false);
}

@Injectable()
export class FindOneUserUseCase {
  async find(currentUser: IOption<User>, user: User): Promise<User> {
    if (!_can(currentUser, user)) {
      _throwForbiddenException();
    }
    return user;
  }
}
