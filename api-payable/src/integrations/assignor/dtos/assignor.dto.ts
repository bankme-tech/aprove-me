import { IsUUID, IsString, MinLength } from 'class-validator';

export class CreatePayablesDto {
  /** É a identificação de um cedente */
  @IsUUID()
  id: string;

  /** É o documento CPF ou CNPJ do cedente */
  @IsString()
  @MinLength(30)
  document: string;

  /** É o email do cedente */
  @IsString()
  @MinLength(140)
  email: string;

  /** É o telefone do cedente */
  @IsString()
  @MinLength(20)
  phone: string;

  /** É a nome ou razão social do cedente */
  @IsString()
  @MinLength(140)
  name: string;
}
