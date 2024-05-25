import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;

  constructor(userInfo: { login: string; password: string }) {
    this.login = userInfo.login;
    this.password = userInfo.password;
  }
}
