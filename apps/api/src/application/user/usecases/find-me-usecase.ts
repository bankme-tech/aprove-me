import { ForbiddenException, Injectable } from '@nestjs/common';

import { IOption, Some } from '@bankme/monads';

import { User } from '@domain/user/models/user';

function _throwForbiddenException(): never {
  throw new ForbiddenException(
    "You don't have the required permissions to get this user",
  );
}

function _can(currentUser: IOption<User>): currentUser is Some<User> {
  return currentUser.isSome();
}

@Injectable()
export class FindMeUseCase {
  async find(currentUser: IOption<User>): Promise<User> {
    if (!_can(currentUser)) {
      _throwForbiddenException();
    }
    return currentUser.value;
  }
}
