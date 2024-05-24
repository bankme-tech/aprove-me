import { BaseException } from '@infra/http/exception/entities/base-exception';
import { HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends BaseException {
  constructor() {
    super({
      code: 'user-already-exists',
      response: 'User already exists',
      status: HttpStatus.CONFLICT,
    });
  }
}
