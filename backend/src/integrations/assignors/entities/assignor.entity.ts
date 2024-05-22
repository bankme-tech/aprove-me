import { ApiProperty } from '@nestjs/swagger';
import { Assignor } from '@prisma/client';

export class AssignorEntity implements Assignor {
  constructor(partial: Partial<AssignorEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;
}
