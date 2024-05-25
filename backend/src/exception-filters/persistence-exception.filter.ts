import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';
import { ReferencedRecordError } from 'src/persistence/errors/referenced-record.error';

@Catch(RecordNotFoundError, ReferencedRecordError)
export class PersistenceExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof ReferencedRecordError) {
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: exception.message,
      });
      return;
    }

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
    });
    return;
  }
}
