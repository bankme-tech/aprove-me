import { IsString } from 'class-validator';

export class CredentialsDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
