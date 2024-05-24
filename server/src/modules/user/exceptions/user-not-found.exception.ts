import { BaseException } from '@infra/http/exception/entities/base-exception';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends BaseException {
  constructor() {
    super({
      code: 'user-not-found',
      response: 'User not found',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
