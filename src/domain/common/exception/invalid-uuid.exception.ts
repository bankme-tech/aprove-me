import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUuidException extends HttpException {
  constructor(id: string) {
    super(`Value ${id} must be a valid UUID`, HttpStatus.BAD_REQUEST);
  }
}
