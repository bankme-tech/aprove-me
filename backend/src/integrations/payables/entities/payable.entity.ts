import { ApiProperty } from '@nestjs/swagger';
import { Payable } from '@prisma/client';

export class PayableEntity implements Payable {
  constructor(partial: Partial<PayableEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  emissionDate: Date;

  @ApiProperty()
  assignor: string;
}
