import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';

@Catch(RecordNotFoundError)
export class PersistenceExceptionFilter implements ExceptionFilter {
  catch(exception: RecordNotFoundError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
    });
    return;
  }
}
