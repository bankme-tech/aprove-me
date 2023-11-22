import { Assignor } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
// import { UUID } from 'crypto';

export class AssignorEntity implements Assignor {
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

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updateAt: Date;
}
