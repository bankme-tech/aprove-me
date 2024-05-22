import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UpdatePayableRequestSchema {
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
  @IsUUID()
  assignorId: string;
}
