import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RegisterPayableResponseSchema {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty({ format: 'float' })
  @Expose()
  value: number;

  @ApiProperty()
  @Expose()
  emissionDate: Date;

  @ApiProperty({ format: 'uuid' })
  @Expose()
  assignorId: string;
}
