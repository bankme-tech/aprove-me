import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from './entities/base-exception';

@Catch(BaseException)
export class BaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BaseExceptionFilter.name);

  catch(exception: BaseException, host: ArgumentsHost) {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const code = exception.code;
    const status = exception.getStatus();

    response.status(status).json({
      code,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
