import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (exception.code === 'P2025') {
      const model = exception.meta.modelName as string;

      return res.status(404).json({
        statusCode: 404,
        message: `${model.toLocaleLowerCase()} not found`,
      });
    }

    if (exception.code === 'P2002') {
      const model = exception.meta.modelName as string;

      return res.status(400).json({
        statusCode: 400,
        message: `${model.toLocaleLowerCase()} already exists`,
      });
    }

    return res.status(500).json({
      statusCode: 500,
      message: 'internal server error',
    });
  }
}
