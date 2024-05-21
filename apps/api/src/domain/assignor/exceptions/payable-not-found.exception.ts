import { NotFoundException } from '@nestjs/common';

import { Id } from '@bankme/domain';

export class AssignorNotFoundException extends NotFoundException {
  static withId(id: Id): AssignorNotFoundException {
    return new AssignorNotFoundException(
      `The assignor identified by '${id}' was not found`,
    );
  }
}
