import { ApiProperty } from '@nestjs/swagger';

import { ICreateUser } from '@domain/user/interfaces/create-user.interface';

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements ICreateUser {
  @ApiProperty({ example: 'jane.doe' })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username!: string;

  @ApiProperty({ example: 'BankMe#123' })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password!: string;
}
