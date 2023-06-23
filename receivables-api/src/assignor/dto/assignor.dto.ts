//Validação dos dados

import { IsNotEmpty, MaxLength } from 'class-validator';

export class AssignorDto {
  @IsNotEmpty({ message: 'O documento é obrigatório' })
  @MaxLength(30, {
    message: 'O documento deve ter no máximo $constraint1 caracteres',
  })
  document: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @MaxLength(140, {
    message: 'O e-mail deve ter no máximo $constraint1 caracteres',
  })
  email: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @MaxLength(20, {
    message: 'O telefone deve ter no máximo $constraint1 caracteres',
  })
  phone: string;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(140, {
    message: 'O nome deve ter no máximo $constraint1 caracteres',
  })
  name: string;
}
