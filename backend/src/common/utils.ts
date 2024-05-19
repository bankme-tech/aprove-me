import { HttpStatus } from '@nestjs/common';
import { ErrorType } from './types/error-types.enum';

export const getHttpStatusCodeForErrorType = (errorCode: ErrorType): number => {
  const errors = {
    [ErrorType.NOT_FOUND_ERROR]: HttpStatus.NOT_FOUND,
    [ErrorType.DATABASE_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
    [ErrorType.SYNC_SERVICE_ERROR]: HttpStatus.BAD_REQUEST,
    [ErrorType.BAD_REQUEST_ERROR]: HttpStatus.BAD_REQUEST,
  };

  return errors[errorCode];
};
