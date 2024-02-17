import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class AuthenticateDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
