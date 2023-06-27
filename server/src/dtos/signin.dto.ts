import { IsNotEmpty, MaxLength } from 'class-validator';

export class SignInDto {
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @MaxLength(30)
  @IsNotEmpty()
  password: string;
}

export class SignInOutput {
  username: string;
  access_token: string;
}
