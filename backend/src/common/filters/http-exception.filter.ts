import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ServiceException } from '../entities/service-exception';
import * as utils from '../utils';
import { ExceptionErrorType } from './types/exception-error.type';
import { ExceptionErrorAlias } from './types/exception-error-alias.type';

@Catch()
export class GeneralErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(
    exception: HttpException | ServiceException | Error,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const status = this.makeStatus(exception);

    this.logger.error(exception);

    const httpMessageOutput = {
      alias: this.makeAlias(exception),
      message: this.makeMessage(exception),
      timestamp: new Date().toISOString(),
      errors: this.parseErrors(exception),
      path: request.url,
      stackTrace: this.makeStackTrace(exception),
    };

    response.status(status).json(httpMessageOutput);
  }

  private parseHttpExceptionError(
    exception: HttpException,
  ): ExceptionErrorType[] {
    const exceptionResponse: any = exception.getResponse();
    if (exceptionResponse.message && Array.isArray(exceptionResponse.message)) {
      const isStringArray = exceptionResponse.message.every(
        (msg: any) => typeof msg === 'string',
      );
      if (isStringArray) {
        const exceptionResult: ExceptionErrorType[] =
          exceptionResponse.message.reduce(
            (stack: ExceptionErrorType[], current: string) => {
              const [field, ...rest] = current.split(' ');
              const message = rest.join(' ');

              const addNewItemToStack = stack.every((stackItem) => {
                if (stackItem.field === field) {
                  stackItem.messages.push(message);
                  return false;
                }
                return true;
              });

              if (addNewItemToStack) {
                stack.push({
                  field: field,
                  messages: [message],
                });
              }

              return stack;
            },
            [],
          );
        return exceptionResult;
      }
    }
    const httpExceptionGenericMessage = () => {
      if (typeof exceptionResponse === 'string') {
        return exceptionResponse;
      }
      if (typeof exceptionResponse?.message === 'string') {
        return exceptionResponse.message;
      }
      return exception.toString();
    };
    return [
      {
        field: 'error',
        messages: [httpExceptionGenericMessage()],
      },
    ];
  }

  private parseServiceExceptionError(
    exception: ServiceException,
  ): ExceptionErrorType[] {
    const exceptionResponse: string = exception.getResponse();
    return [
      {
        field: 'error',
        messages: [exceptionResponse],
      },
    ];
  }

  public parseErrors(
    exception: HttpException | ServiceException | Error,
  ): ExceptionErrorType[] {
    if (exception instanceof HttpException) {
      return this.parseHttpExceptionError(exception);
    }
    if (exception instanceof ServiceException) {
      return this.parseServiceExceptionError(exception);
    }
    return [
      {
        field: 'error',
        messages: [exception.message ?? 'unknown message'],
      },
    ];
  }

  public makeAlias(
    exception: HttpException | ServiceException | Error,
  ): ExceptionErrorAlias {
    if (exception instanceof HttpException) {
      const exceptionResponse: any = exception.getResponse();
      if (typeof exceptionResponse !== 'string') {
        if (exceptionResponse?.error === 'Bad Request') {
          return ExceptionErrorAlias.INVALID_PAYLOAD;
        }
      }
    }
    if (exception instanceof ServiceException) {
      return ExceptionErrorAlias.SERVICE_ERROR;
    }
    return ExceptionErrorAlias.UNKNOWN_ERROR;
  }

  public makeStackTrace(
    exception: HttpException | ServiceException | Error,
  ): string | undefined {
    if (process.env?.APPLICATION_ENV === 'development') {
      return exception.stack;
    }
    return undefined;
  }

  public makeStatus(
    exception: HttpException | ServiceException | Error,
  ): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    if (exception instanceof ServiceException) {
      return utils.getHttpStatusCodeForErrorType(exception.getStatus());
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  public makeMessage(exception: HttpException | ServiceException | Error) {
    if (
      exception instanceof ServiceException ||
      exception instanceof HttpException
    ) {
      const exceptionResponse: any = exception.getResponse();
      return typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse?.error ?? 'Unknown error';
    }

    return exception.message;
  }
}
