import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'Login usuário',
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'Senha usuário',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
