import { UnauthorizedException } from '@nestjs/common';

export class EmailOrPasswordIncorrectError extends UnauthorizedException {
  constructor() {
    super('Email or password incorrect');
  }
}
