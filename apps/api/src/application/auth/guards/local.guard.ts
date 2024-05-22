import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';

import { InvalidUsernameOrPasswordException } from '@domain/auth/exceptions/invalid-username-or-password.exception';

import {
  IUserRepository,
  USER_REPOSITORY,
} from '@infra/user/repositories/user.repository';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = await this._userRepository.findOneByUsername(
      request.body!['username'],
    );
    if (user.isNone()) {
      throw new InvalidUsernameOrPasswordException();
    }
    const passwordMatches = await bcryptjs.compare(
      request.body!['password'],
      user.value.password.value,
    );
    if (!passwordMatches) {
      throw new InvalidUsernameOrPasswordException();
    }
    request['user'] = user.value;
    return true;
  }
}
