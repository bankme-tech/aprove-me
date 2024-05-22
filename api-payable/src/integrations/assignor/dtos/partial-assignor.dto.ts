import { IsString, MaxLength, IsOptional } from 'class-validator';

export class PartialAssignorDto {
  /** É o documento CPF ou CNPJ do cedente */
  @IsString()
  @MaxLength(30)
  @IsOptional()
  document?: string;

  /** É o email do cedente */
  @IsString()
  @MaxLength(140)
  @IsOptional()
  email?: string;

  /** É o telefone do cedente */
  @IsString()
  @MaxLength(20)
  @IsOptional()
  phone?: string;

  /** É a nome ou razão social do cedente */
  @IsOptional()
  @IsString()
  @MaxLength(140)
  name?: string;
}
