import { ApiProperty } from '@nestjs/swagger';

export class AssignorOkResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  document: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class AssignorUnauthorizedResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  status_code: number;
}
