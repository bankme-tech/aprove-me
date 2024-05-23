import { ConflictException } from '@nestjs/common';

export class LoginAlreadyExistsError extends ConflictException {
  constructor() {
    super('Login already exists');
  }
}
