import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({message: 'The "login" field must be a string.'})
  @IsNotEmpty({message: 'The "login" field cannot be empty'})
  login: string;

  @IsString({message: 'The "password" field must be a string.'})
  @IsNotEmpty({message: 'The "password" field cannot be empty'})
  password: string
}