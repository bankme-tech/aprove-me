import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export interface BaseExceptionProps {
  code: string;
  response: string | Record<string, any>;
  status: number;
  options?: HttpExceptionOptions;
}

export class BaseException extends HttpException {
  private readonly _code: string;

  constructor(baseException: BaseExceptionProps) {
    super(baseException.response, baseException.status, baseException.options);
    this._code = baseException.code;
  }

  get code() {
    return this._code;
  }
}
