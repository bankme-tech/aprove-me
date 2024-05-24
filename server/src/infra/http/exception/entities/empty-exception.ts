import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export interface EmptyExceptionProps {
  status: number;
  options?: HttpExceptionOptions;
}

export class EmptyException extends HttpException {
  constructor(emptyException: EmptyExceptionProps) {
    super({}, emptyException.status, emptyException.options);
  }
}
