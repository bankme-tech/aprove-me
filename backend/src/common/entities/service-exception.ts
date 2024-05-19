import { ErrorType } from '../types/error-types.enum';

export class ServiceException extends Error {
  constructor(
    public errorMessage: string,
    public errorCode: ErrorType,
  ) {
    super();
  }

  getResponse(): string {
    return this.errorMessage;
  }

  getStatus(): ErrorType {
    return this.errorCode;
  }
}
