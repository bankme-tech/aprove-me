import { NotFoundException } from '@nestjs/common';

import { Id } from '@bankme/domain';

export class PayableNotFoundException extends NotFoundException {
  static withId(id: Id): PayableNotFoundException {
    return new PayableNotFoundException(
      `The payable identified by '${id}' was not found`,
    );
  }
}
