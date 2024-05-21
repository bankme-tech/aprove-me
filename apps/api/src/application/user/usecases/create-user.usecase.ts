import { Inject, Injectable } from '@nestjs/common';

import { User } from '@domain/user/models/user';
import { ICreateUser } from '@domain/user/interfaces/create-user.interface';
import { Password } from '@domain/user/value-objects/password';
import { DuplicatedUsernameException } from '@domain/user/exceptions/duplicated-username.exception';

import {
  IUserRepository,
  USER_REPOSITORY,
} from '@infra/user/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _repository: IUserRepository,
  ) {}

  async create(data: ICreateUser): Promise<User> {
    const { username, password } = data;
    if (await this._hasUserWithUsername(username)) {
      throw DuplicatedUsernameException.withUsername(username);
    }
    return this._repository.create({
      username,
      password: Password.fromStr(password),
    });
  }

  private async _hasUserWithUsername(username: string): Promise<boolean> {
    const user = await this._repository.findOneByUsername(username);
    return user.isSome();
  }
}
