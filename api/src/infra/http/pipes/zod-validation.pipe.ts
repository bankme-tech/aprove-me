import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.flatten().fieldErrors;
        const objectHasNoKeys = Object.keys(issues).length === 0;
        if (objectHasNoKeys) {
          console.log('ISSUEESS: ', error);
          throw new BadRequestException({
            issues: error.issues,
            message: 'Validation failed',
            statusCode: 400,
          });
        }
        throw new BadRequestException({
          issues,
          message: 'Validation failed',
          statusCode: 400,
        });
      } else {
        throw new BadRequestException('Validation failed');
      }
    }
  }
}
