import 'reflect-metadata';
import { SignInDto } from './sign-in.dto';
import {
  itShouldThrowIfFieldIsNotOfType,
  itShouldValidateSuccessfully,
} from '../../utils/test';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('SignInDto', () => {
  const validDto = {
    login: 'testuser',
    password: 'password123',
  } as SignInDto;

  itShouldValidateSuccessfully(validDto, SignInDto);

  itShouldThrowIfFieldIsNotOfType({
    dto: validDto,
    dtoClass: SignInDto,
    fields: [
      {
        key: 'login',
        type: 'string',
      },
      {
        key: 'password',
        type: 'string',
      },
    ],
  });

  it('should throw an error if login is empty', async () => {
    const invalidDto = { ...validDto, login: '' };
    const object = plainToInstance(SignInDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'login should not be empty',
    });
  });

  it('should throw an error if password is empty', async () => {
    const invalidDto = { ...validDto, password: '' };
    const object = plainToInstance(SignInDto, invalidDto);
    const errors = await validate(object);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'password should not be empty',
    });
  });
});
