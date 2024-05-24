import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 1,
    description:
      'ID do usuário. Required apenas para atualização de usuário e geração do token.',
    required: false,
    type: Number,
  })
  id: number;

  @ApiProperty({
    example: 'Fulaninho de Tal',
    description: 'Login do usuário',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
