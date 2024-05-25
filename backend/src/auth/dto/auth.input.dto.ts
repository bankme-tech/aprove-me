import { IsString } from 'class-validator';

export class AuthInputDTO {
  @IsString({ message: 'Login must be a string' })
  public login: string;

  @IsString({ message: 'Password must be a string' })
  public password: string;
}
