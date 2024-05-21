import { IsNotEmpty } from 'class-validator';

export class AuthenticateAccountRequestSchema {
  @IsNotEmpty({ message: 'you must provide a login.' })
  login: string;

  @IsNotEmpty({ message: 'you must provide a password.' })
  password: string;
}
