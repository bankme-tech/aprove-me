import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateDto<T>(dto: T, type: any) {
  const object = plainToInstance(type, dto, {
    excludeExtraneousValues: true,
  }) as T;
  return validate(object as any).then((errors) => {
    if (errors.length > 0) {
      const message = errors.map((error) => {
        return Object.values(error.constraints).join(', ');
      });

      throw new BadRequestException({
        message,
        error: 'Bad Request',
        statusCode: 400,
      });
    }
    return object as T;
  });
}
