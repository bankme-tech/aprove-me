//Validação dos dados

import { IsNotEmpty, IsUUID } from 'class-validator';

export class PayableDto {
  @IsNotEmpty({ message: 'O ID é obrigatório' })
  @IsUUID('4', { message: 'O id deve ser um UUID válido' })
  id: string;

  @IsNotEmpty({ message: 'O valor é obrigatório' })
  value: number;

  @IsNotEmpty({ message: 'A data é obrigatório' })
  emissionDate: Date;

  @IsNotEmpty({ message: 'O cedente é obrigatório' })
  assignor: number;
}
