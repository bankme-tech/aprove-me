import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
