import { IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty({ message: 'O login é obrigatório' })
  login: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;
}
