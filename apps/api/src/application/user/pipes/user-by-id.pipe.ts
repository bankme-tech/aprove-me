import { Inject, Injectable, PipeTransform } from '@nestjs/common';

import { Id, User } from '@bankme/domain';

import { UserNotFoundException } from '@domain/user/exceptions/user-not-found.exception';

import {
  IUserRepository,
  USER_REPOSITORY,
} from '@infra/user/repositories/user.repository';

@Injectable()
export class UserByIdPipe implements PipeTransform<Id, Promise<User | null>> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserRepository,
  ) {}

  async transform(id: Id): Promise<User | null> {
    return this._findUserByIdOrThrow(id);
  }

  private async _findUserByIdOrThrow(id: Id): Promise<User> {
    const user = await this._userRepository.findOneById(id);
    if (user.isNone()) {
      throw UserNotFoundException.withId(id);
    }
    return user.value;
  }
}
