import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'jane.doe' })
  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty({ message: 'Login cannot be empty' })
  login!: string;

  @ApiProperty({ example: 'BankMe#123' })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password!: string;
}
