import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthenticateAccountRequestSchema {
  @ApiProperty({ required: true, default: 'aprovame' })
  @IsNotEmpty({ message: 'you must provide a login.' })
  login: string;

  @ApiProperty({ required: true, default: 'aprovame' })
  @IsNotEmpty({ message: 'you must provide a password.' })
  password: string;
}
