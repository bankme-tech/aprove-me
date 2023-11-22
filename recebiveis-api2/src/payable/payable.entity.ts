import { Payable } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
// import { UUID } from 'crypto';

export class PayableEntity implements Payable {
  @ApiProperty()
  id: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  emissionDate: Date;

  @ApiProperty()
  assignorId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updateAt: Date;
}
