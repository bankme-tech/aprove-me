import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAssignorDto{
  @IsString({message: 'The "document" field must be a string.'})
  @IsNotEmpty({message: 'The "document" field cannot be empty'})
  @Length(1, 30, {message: 'The "document" field must have a minimum of 1 character and a maximum of 30'})
  document: string;

  @IsString({message: 'The "email" field must be a string.'})
  @IsNotEmpty({message: 'The "email" field cannot be empty'})
  @Length(1, 140, {message: 'The "email" field must have a minimum of 1 character and a maximum of 140'})
  @IsEmail({}, {message: "The email format is not valid."})
  email: string;

  @IsString({message: 'The "phone" field must be a string.'})
  @IsNotEmpty({message: 'The "phone" field cannot be empty'})
  @Length(1, 20, {message: 'The "phone" field must have a minimum of 1 character and a maximum of 20'})
  phone: string;

  @IsString({message: 'The "name" field must be a string.'})
  @IsNotEmpty({message: 'The "name" field cannot be empty'})
  @Length(1, 140, {message: 'The "name" field must have a minimum of 1 character and a maximum of 140'})
  name: string
}