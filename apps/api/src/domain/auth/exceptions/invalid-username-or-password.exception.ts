import { UnauthorizedException } from '@nestjs/common';

export class InvalidUsernameOrPasswordException extends UnauthorizedException {
  constructor() {
    super(
      'Invalid username or password. Please check your credentials and try again',
    );
  }
}
