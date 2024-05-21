import { NotFoundException } from '@nestjs/common';

export class PayableNotFoundError extends NotFoundException {
  constructor() {
    super('Payable not found');
  }
}
