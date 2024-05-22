import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    default: 'aprovame',
  })
  login: string;

  @ApiProperty({
    default: 'aprovame',
  })
  password: string;
}
