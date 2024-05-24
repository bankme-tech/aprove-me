import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SafeUserDto } from './safe-user.dto';
import {
  itShouldThrowIfFieldIsNotOfType,
  itShouldValidateSuccessfully,
} from '../../utils/test';
import { Role } from '../entities/user.entity';

describe('SafeUserDto', () => {
  const validDto: SafeUserDto = {
    assignorId: '9b2cde3e-4e20-4c6b-8f11-4a4b3f3d9148',
    role: Role.USER,
    username: 'testuser',
  };

  itShouldValidateSuccessfully(validDto, SafeUserDto);

  itShouldThrowIfFieldIsNotOfType({
    dto: validDto,
    dtoClass: SafeUserDto,
    fields: [
      {
        key: 'assignorId',
        type: 'uuid',
      },
      {
        key: 'role',
        type: 'enum',
      },
      {
        key: 'username',
        type: 'string',
      },
    ],
  });

  it('should throw an error if assignorId is not a valid UUID', async () => {
    const invalidDto = { ...validDto, assignorId: 'invalid-uuid' };
    const object = plainToClass(SafeUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isUuid: 'assignorId must be a UUID',
    });
  });

  it('should throw an error if role is not a valid enum value', async () => {
    const invalidDto = { ...validDto, role: 'invalid-role' as Role };
    const object = plainToClass(SafeUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isEnum: 'role must be one of the following values: ADMIN, USER',
    });
  });

  it('should throw an error if username is empty', async () => {
    const invalidDto = { ...validDto, username: '' };
    const object = plainToClass(SafeUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'username should not be empty',
    });
  });
});
