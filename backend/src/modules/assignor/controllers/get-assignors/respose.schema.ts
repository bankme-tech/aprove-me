import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetAssignorsResponseSchema {
  @ApiProperty({ required: true, format: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty({ required: true })
  @Expose()
  name: string;

  @ApiProperty({ required: true })
  @Expose()
  document: string;

  @ApiProperty({ required: true, format: 'email' })
  @Expose()
  email: string;

  @ApiProperty({ required: true })
  @Expose()
  phone: string;
}
