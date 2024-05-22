import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetPayablesResponseSchema {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  value: number;

  @ApiProperty()
  @Expose()
  emissionDate: Date;

  @ApiProperty()
  @Expose()
  assignorId: string;
}
