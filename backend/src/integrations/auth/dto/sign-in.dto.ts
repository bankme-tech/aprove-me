import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
