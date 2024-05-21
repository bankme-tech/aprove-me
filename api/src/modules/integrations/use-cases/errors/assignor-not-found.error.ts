import { NotFoundException } from '@nestjs/common';

export class AssignorNotFoundError extends NotFoundException {
  constructor() {
    super('Assignor not found');
  }
}
