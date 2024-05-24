import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import {
  itShouldThrowIfFieldIsNotOfType,
  itShouldValidateSuccessfully,
} from '../../utils/test';
import { Role } from '../entities/user.entity';

describe('CreateUserDto', () => {
  const validDto: CreateUserDto = {
    assignorId: '9b2cde3e-4e20-4c6b-8f11-4a4b3f3d9148',
    role: Role.USER,
    username: 'testuser',
    password: 'password123',
  };

  itShouldValidateSuccessfully(validDto, CreateUserDto);

  itShouldThrowIfFieldIsNotOfType({
    dto: validDto,
    dtoClass: CreateUserDto,
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
      {
        key: 'password',
        type: 'string',
      },
    ],
  });

  it('should throw an error if assignorId is not a valid UUID', async () => {
    const invalidDto = { ...validDto, assignorId: 'invalid-uuid' };
    const object = plainToClass(CreateUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isUuid: 'assignorId must be a UUID',
    });
  });

  it('should throw an error if role is not a valid enum value', async () => {
    const invalidDto = { ...validDto, role: 'invalid-role' as Role };
    const object = plainToClass(CreateUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isEnum: 'role must be one of the following values: ADMIN, USER',
    });
  });

  it('should throw an error if username is empty', async () => {
    const invalidDto = { ...validDto, username: '' };
    const object = plainToClass(CreateUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'username should not be empty',
    });
  });

  it('should throw an error if password is empty', async () => {
    const invalidDto = { ...validDto, password: '' };
    const object = plainToClass(CreateUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'password should not be empty',
    });
  });
});
