import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePayableDto {
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  emissionDate: string;

  @ApiProperty()
  assignorId?: string;
}
