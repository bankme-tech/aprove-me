import { UnauthorizedException } from '@nestjs/common';

export class InvalidOrMissingAuthenticationTokenException extends UnauthorizedException {
  constructor() {
    super('Invalid or Missing authentication token');
  }
}
