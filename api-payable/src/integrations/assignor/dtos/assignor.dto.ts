import { IsEmail, IsString, MaxLength } from 'class-validator';

export class AssignorDto {
  // /** É a identificação de um cedente */
  // @IsUUID()
  // id: string;

  /** É o documento CPF ou CNPJ do cedente */
  @IsString()
  @MaxLength(30)
  document: string;

  /** É o email do cedente */
  @IsEmail()
  @MaxLength(140)
  email: string;

  /** É o telefone do cedente */
  @IsString()
  @MaxLength(20)
  phone: string;

  /** É a nome ou razão social do cedente */
  @IsString()
  @MaxLength(140)
  name: string;
}
