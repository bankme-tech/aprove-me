import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {
  @ApiProperty({
    required: false,
    description:
      'Requerido apenas para buscar um usuário pelo ID ou atualizar um usuário',
    type: Number,
  })
  id?: number;

  @ApiProperty({
    required: true,
    example: 'MestreDosMagos',
    type: String,
    minLength: 5,
    maxLength: 30,
  })
  @Length(5, 30)
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    required: true,
    example: '123456',
    minLength: 6,
    maxLength: 140,
  })
  @Length(6, 140)
  @IsNotEmpty()
  @IsString()
  password: string;
}
