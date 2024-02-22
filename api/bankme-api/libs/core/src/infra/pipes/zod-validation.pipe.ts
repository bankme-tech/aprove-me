import { PipeTransform, BadRequestException, HttpStatus } from '@nestjs/common';
import { HttpVO } from 'bme/core/http/http.vo';
import { Fails } from 'bme/core/messages/fails';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((x) => {
          return (
            x.message === 'Required'
              ? Fails.FIELD_BY_NAME_REQUIRED
              : Fails.FIELD_BY_NAME_INVALID
          ).replace('#CAMPO#', x.path.join('.'));
        });
        throw new BadRequestException(
          new HttpVO(false, HttpStatus.BAD_REQUEST, value, messages),
        );
      }

      throw new BadRequestException(
        new HttpVO(false, HttpStatus.BAD_REQUEST, value, [Fails.INVALID_BODY]),
      );
    }
  }
}
