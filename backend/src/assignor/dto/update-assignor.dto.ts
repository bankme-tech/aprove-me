import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignorDto } from './create-assignor.dto';
import { IsString, IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateAssignorDto extends PartialType(CreateAssignorDto) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: 'The document field cannot be longer than 30 characters.' })
  @IsOptional()
  document?: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(140, { message: 'The email field cannot be longer than 140 characters.' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'The phone field cannot be longer than 20 characters.' })
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(140, { message: 'The name field cannot be longer than 140 characters.' })
  @IsOptional()
  name?: string;
}
