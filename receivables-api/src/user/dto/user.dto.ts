import { IsNotEmpty, MaxLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'O documento é login' })
  @MaxLength(20, {
    message: 'O login deve ter no máximo $constraint1 caracteres',
  })
  login: string;

  @IsNotEmpty({ message: 'O senha é obrigatório' })
  @MaxLength(20, {
    message: 'O senha deve ter no máximo $constraint1 caracteres',
  })
  senha: string;
}
