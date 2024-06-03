import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class AuthLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'email@email.com',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
    required: true,
  })
  password: string;

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }
}
