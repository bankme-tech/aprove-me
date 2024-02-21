import { ApiProperty } from '@nestjs/swagger';

export class AuthUnauthorizedResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  status_code: number;
}

export class AuthConflictResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  status_code: number;
}

export class AuthOkResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  access_token: string;
}
