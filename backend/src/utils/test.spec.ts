import 'reflect-metadata';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  itShouldValidateSuccessfully,
  itShouldThrowIfFieldIsEmpty,
  itShouldThrowIfFieldIsNotOfType,
  itShouldFailIfValueDoesNotMeetRangeCriteria,
} from './test';
import { randomUUID } from 'crypto';
enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
class TestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(10)
  description: string;

  @IsOptional()
  @IsString()
  email?: string;
}

describe('TestDto', () => {
  const validDto = {
    name: 'John Doe',
    description: 'A valid description',
    role: Role.USER,
    email: 'john.doe@example.com',
    id: randomUUID(),
  };

  describe('itShouldValidateSuccessfully', () => {
    itShouldValidateSuccessfully(validDto, TestDto);
  });

  describe('itShouldThrowIfFieldIsEmpty', () => {
    itShouldThrowIfFieldIsEmpty({
      keys: ['name', 'description'],
      dto: validDto,
      dtoClass: TestDto,
    });
  });

  describe('itShouldThrowIfFieldIsNotOfType', () => {
    itShouldThrowIfFieldIsNotOfType({
      fields: [
        { key: 'name', type: 'string' },
        { key: 'id', type: 'uuid' },
        { key: 'role', type: 'enum' },
        { key: 'description', type: 'string' },
        { key: 'email', type: 'string' },
      ],
      dto: validDto,
      dtoClass: TestDto,
    });
  });

  describe('itShouldFailIfValueDoesNotMeetRangeCriteria', () => {
    itShouldFailIfValueDoesNotMeetRangeCriteria({
      fields: [
        { key: 'name', min: 3, max: 30 },
        { key: 'description', min: 10, max: 100 },
      ],
      dto: validDto,
      dtoClass: TestDto,
    });
  });
});
