import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterAssignorDto {
  @ApiProperty({
    description: 'Documento CPF ou CNPJ do cedente.',
    example: '123.456.789-00',
    maxLength: 30,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  document: string;

  @ApiProperty({
    description: 'Email do cedente.',
    example: 'example@example.com',
    maxLength: 140,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 140)
  email: string;

  @ApiProperty({
    description: 'Telefone do cedente.',
    example: '(12) 3456-7890',
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  phone: string;

  @ApiProperty({
    description: 'Nome ou razão social do cedente.',
    example: 'João da Silva',
    maxLength: 140,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 140)
  name: string;
}
