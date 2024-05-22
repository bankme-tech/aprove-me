import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  value: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  emissionDate: Date;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  assignor: string;
}
