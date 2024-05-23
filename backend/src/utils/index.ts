import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';

export async function validateDto<T>(dto: T, type: any) {
  const object = plainToInstance(type, dto) as T;
  return validate(object as any, {
    whitelist: true,
    forbidNonWhitelisted: true,
  }).then((errors) => {
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

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
