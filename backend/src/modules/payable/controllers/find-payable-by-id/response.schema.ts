import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class Assignor {
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

export class FindByPayableIdResponseSchema {
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

  @Type(() => Assignor)
  @ApiProperty({ required: false })
  @Expose()
  assignor: Assignor;
}
