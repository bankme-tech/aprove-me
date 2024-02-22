import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (exception.code === 'P2025') {
      return res.status(404).json({
        statusCode: 404,
        message: `${exception.meta.modelName} not found`,
      });
    }

    if (exception.code === 'P2002') {
      return res.status(400).json({
        statusCode: 400,
        message: 'User already exists',
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
