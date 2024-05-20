import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    switch (exception.code) {
      case 'P2025':
        // Record not found
        // https://www.prisma.io/docs/orm/reference/error-reference#p2025
        response.status(404).json({
          statusCode: 404,
          message: `Resource not found.`,
          error: 'Not Found',
        });
        break;

      case 'P2002':
        // Unique constraint violation
        // https://www.prisma.io/docs/orm/reference/error-reference#p2025
        response.status(409).json({
          statusCode: 409,
          message: `Conflict: The specified resource already exists.`,
          error: 'Conflict',
        });
        break;

      default:
        // Handle other Prisma errors
        response.status(500).json({
          statusCode: 500,
          message: `Internal server error.`,
          error: 'Internal Server Error',
        });
        break;
    }
  }
}
