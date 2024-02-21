import { ApiProperty } from '@nestjs/swagger';

export class PayableOkResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  value: number;
  @ApiProperty()
  valueInCents: number;
  @ApiProperty()
  emissionDate: Date;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  assignorId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class PayableUnauthorizedResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  status_code: number;
}
