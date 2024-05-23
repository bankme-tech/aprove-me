import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsString, Length } from 'class-validator';

export class AssignorDto {
  @ApiProperty({
    required: true,
    description: 'ID do cedente',
    type: String,
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    required: true,
    description: 'É o documento do cedente, como CNPJ ou CPF',
    type: String,
    minLength: 5,
    maxLength: 140,
    example: 'CPF: 12345678901, CNPJ: 12345678901234',
  })
  @Length(5, 30)
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({
    required: true,
    description: 'É o email do cedente',
    type: String,
    minLength: 5,
    maxLength: 140,
    example: 'teste@teste.com',
  })
  @Length(5, 140)
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
    description: 'É o telefone do cedente',
    type: String,
    minLength: 5,
    maxLength: 20,
    example: '123456789',
  })
  @Length(5, 20)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    required: true,
    description: 'É o nome do cedente',
    type: String,
    minLength: 5,
    maxLength: 140,
    example: 'Cedente Teste da Silva',
  })
  @Length(5, 140)
  @IsNotEmpty()
  @IsString()
  name: string;
}
