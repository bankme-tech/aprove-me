import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFieldException extends HttpException {
  constructor(field: string) {
    super(`Invalid Field: ${field}.`, HttpStatus.BAD_REQUEST);
  }
}
