import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenError extends UnauthorizedException {
  constructor() {
    super('Invalid token');
  }
}
