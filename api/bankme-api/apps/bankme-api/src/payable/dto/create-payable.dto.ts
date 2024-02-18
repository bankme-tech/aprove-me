import { ApiProperty } from '@nestjs/swagger';

export class CreatePayableDto {
  @ApiProperty()
  public value: number;
}
