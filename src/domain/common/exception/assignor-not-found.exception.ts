import { HttpException, HttpStatus } from '@nestjs/common';

export class AssignorNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Assignor ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
