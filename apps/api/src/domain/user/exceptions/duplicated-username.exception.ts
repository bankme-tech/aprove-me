import { ConflictException } from '@nestjs/common';

export class DuplicatedUsernameException extends ConflictException {
  static withUsername(username: string): DuplicatedUsernameException {
    return new DuplicatedUsernameException(
      `An user with the username ${username} was already registered`,
    );
  }
}
