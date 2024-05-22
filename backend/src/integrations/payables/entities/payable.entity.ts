import { ApiProperty } from '@nestjs/swagger';
import { Payable } from '@prisma/client';

export class PayableEntity implements Payable {
  @ApiProperty()
  id: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  emissionDate: Date;

  @ApiProperty()
  assignor: string;
}
