import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

enum PrismaErrorCodes {
  UniqueConstraintViolation = 'P2002',
}

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === PrismaErrorCodes.UniqueConstraintViolation) {
      const { meta } = exception;
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: `${meta.modelName} with the same ${meta.target} already exists`,
      });
      return;
    }
  }
}
