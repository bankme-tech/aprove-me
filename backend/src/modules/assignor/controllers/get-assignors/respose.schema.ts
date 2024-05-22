import { ApiProperty } from '@nestjs/swagger';

export class GetAssignorsResponseSchema {
  @ApiProperty({ required: true, format: 'uuid' })
  id: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  document: string;

  @ApiProperty({ required: true, format: 'email' })
  email: string;

  @ApiProperty({ required: true })
  phone: string;
}
