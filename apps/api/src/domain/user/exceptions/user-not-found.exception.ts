import { NotFoundException } from '@nestjs/common';

import { Id } from '@bankme/domain';

export class UserNotFoundException extends NotFoundException {
  static withId(id: Id): UserNotFoundException {
    return new UserNotFoundException(
      `The user identified by '${id}' was not found`,
    );
  }

  static withEmail(email: string): UserNotFoundException {
    return new UserNotFoundException(
      `The user identified by '${email}' was not found`,
    );
  }
}
