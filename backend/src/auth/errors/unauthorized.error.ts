import { UnauthorizedException } from '@nestjs/common';

export class UnauthorizedError extends UnauthorizedException {
  constructor() {
    super('Não autorizado');
    this.name = 'UnauthorizedError';
  }
}
