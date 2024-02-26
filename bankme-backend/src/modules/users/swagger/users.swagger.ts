import { ApiProperty } from '@nestjs/swagger';

export class UserOkResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class UserUnauthorizedResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  status_code: number;
}
