import { BaseException } from '@infra/http/exception/entities/base-exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidJwtProvidedException extends BaseException {
  constructor() {
    super({
      code: 'invalid-jwt',
      response: 'Invalid JWT',
      status: HttpStatus.FORBIDDEN,
    });
  }
}
