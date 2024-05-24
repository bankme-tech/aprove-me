import { HttpStatus } from '@nestjs/common';
import { EmptyException } from '@infra/http/exception/entities/empty-exception';

export class UnauthorizedUserException extends EmptyException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
