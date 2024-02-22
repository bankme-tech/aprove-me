import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
