import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterPayableRequestSchema {
  @ApiProperty({ required: true, format: 'float' })
  @IsNotEmpty({ message: 'you must provide a value.' })
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @ApiProperty({ required: true, format: 'date-time' })
  @IsNotEmpty({ message: 'you must provide an emissionDate.' })
  @IsDateString()
  emissionDate: Date;

  @ApiProperty({ required: true, format: 'uuid' })
  @IsNotEmpty({ message: 'you must provide an assignor.' })
  assignor: string;
}
