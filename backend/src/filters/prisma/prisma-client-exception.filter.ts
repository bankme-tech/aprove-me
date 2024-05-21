import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly defaultMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  };

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    this.catchClientKnownRequestError(exception, host);
  }

  private catchClientKnownRequestError(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const statusCode = this.defaultStatusCode(exception);

    const message = this.defaultExceptionMessage(exception);

    if (host.getType() === 'http') {
      if (statusCode === undefined) {
        return super.catch(exception, host);
      }

      return super.catch(
        new HttpException({ statusCode, message }, statusCode),
        host,
      );
    }
    if (statusCode === undefined) {
      return exception;
    }

    return new HttpException({ statusCode, message }, statusCode);
  }

  private defaultStatusCode(
    exception: Prisma.PrismaClientKnownRequestError,
  ): number | undefined {
    return this.defaultMapping[exception.code];
  }

  private defaultExceptionMessage(
    exception: Prisma.PrismaClientKnownRequestError,
  ): string {
    const shortMessage = exception.message.substring(
      exception.message.indexOf('→'),
    );
    return (
      `[${exception.code}]: ` +
      shortMessage
        .substring(shortMessage.indexOf('\n'))
        .replace(/\n/g, '')
        .trim()
    );
  }
}
