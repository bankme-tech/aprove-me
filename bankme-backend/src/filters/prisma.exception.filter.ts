import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { code, meta } = exception;

    if (code === 'P2002') {
      return response.status(409).json({
        statusCode: 409,
        message: 'Unique constraint validation error',
        fields: meta?.target,
      });
    }

    if (code === 'P2003') {
      return response.status(409).json({
        statusCode: 409,
        message: 'Foreign key constraint error',
        fields: meta?.field_name,
      });
    }

    if (code === 'P2025') {
      return response.status(404).json({
        statusCode: 404,
        message:
          'An operation failed because it depends on one or more records that were required but not found',
      });
    }

    return response.sendStatus(500);
  }
}
