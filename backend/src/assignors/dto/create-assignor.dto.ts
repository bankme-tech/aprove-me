import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAssignorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: 'The document field cannot be longer than 30 characters.' })
  document: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(140, { message: 'The email field cannot be longer than 140 characters.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'The phone field cannot be longer than 20 characters.' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(140, { message: 'The name field cannot be longer than 140 characters.' })
  name: string;
}
