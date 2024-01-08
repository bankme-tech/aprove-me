import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          error.errors.map((entry) => ({
            code: entry.message === 'Required' ? 'required' : entry.code,
            maximum: (entry as unknown as { maximum: number }).maximum,
            field: entry.path.join('.'),
            message: entry.message,
          })),
        );
      }

      throw new BadRequestException([{ code: 'unexpected_error' }]);
    }
  }
}
