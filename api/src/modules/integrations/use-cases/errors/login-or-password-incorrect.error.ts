import { UnauthorizedException } from '@nestjs/common';

export class LoginOrPasswordIncorrectError extends UnauthorizedException {
  constructor() {
    super('Login or password incorrect');
  }
}
