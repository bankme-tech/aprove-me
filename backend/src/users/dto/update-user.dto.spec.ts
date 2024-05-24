import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './update-user.dto';
import {
  itShouldThrowIfFieldIsNotOfType,
  itShouldValidateSuccessfully,
} from '../../utils/test';
import { Role } from '../entities/user.entity';

describe('UpdateUserDto', () => {
  const validDto: UpdateUserDto = {
    assignorId: '9b2cde3e-4e20-4c6b-8f11-4a4b3f3d9148',
    role: Role.USER,
    password: 'password',
    userId: '9b2cde3e-4e20-4c6b-8f11-4a4b3f3d9148',
  };

  itShouldValidateSuccessfully(validDto, UpdateUserDto);

  itShouldThrowIfFieldIsNotOfType({
    dto: validDto,
    dtoClass: UpdateUserDto,
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
        key: 'password',
        type: 'string',
      },
      {
        key: 'userId',
        type: 'uuid',
      },
    ],
  });

  it('should throw an error if assignorId is not a valid UUID', async () => {
    const invalidDto = { ...validDto, assignorId: 'invalid-uuid' };
    const object = plainToClass(UpdateUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isUuid: 'assignorId must be a UUID',
    });
  });

  it('should throw an error if role is not a valid enum value', async () => {
    const invalidDto = { ...validDto, role: 'invalid-role' as Role };
    const object = plainToClass(UpdateUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isEnum: 'role must be one of the following values: ADMIN, USER',
    });
  });

  it('should throw an error if password is empty', async () => {
    const invalidDto = { ...validDto, password: '' };
    const object = plainToClass(UpdateUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'password should not be empty',
    });
  });

  it('should throw an error if userId is not a valid UUID', async () => {
    const invalidDto = { ...validDto, userId: 'invalid-uuid' };
    const object = plainToClass(UpdateUserDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isUuid: 'userId must be a UUID',
    });
  });
});
