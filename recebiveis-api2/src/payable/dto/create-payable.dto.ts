import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePayableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'value must be a max two decimal' },
  )
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  emissionDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  assignorId: string;
}
