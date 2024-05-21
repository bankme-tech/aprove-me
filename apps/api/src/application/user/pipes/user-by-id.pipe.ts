import { Inject, Injectable, PipeTransform } from '@nestjs/common';

import { UserNotFoundException } from '@domain/user/exceptions/user-not-found.exception';
import { IUser } from '@domain/user/interfaces/user.interface';
import { Id } from '@domain/shared/id';

import {
  IUserRepository,
  USER_REPOSITORY,
} from '@infra/user/repositories/user.repository';

@Injectable()
export class UserByIdPipe implements PipeTransform<Id, Promise<IUser | null>> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserRepository,
  ) {}

  async transform(id: Id): Promise<IUser | null> {
    return this._findUserByIdOrThrow(id);
  }

  private async _findUserByIdOrThrow(id: Id): Promise<IUser> {
    const user = await this._userRepository.findOneById(id);
    if (user.isNone()) {
      throw UserNotFoundException.withId(id);
    }
    return user.value;
  }
}
