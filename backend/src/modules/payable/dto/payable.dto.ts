import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { BaseModel } from 'src/models/baseModel.dto';

export class PayableDto extends BaseModel {
  @IsNumber()
  @IsNotEmpty({ message: 'value must not be empty' })
  @IsPositive()
  @ApiProperty()
  value: number;

  @IsUUID()
  @IsNotEmpty({ message: 'assignorId must not be empty' })
  @ApiProperty()
  assignorId: string;

  @IsDateString()
  @IsNotEmpty({ message: 'emissionDate must not be empty' })
  @ApiProperty()
  emissionDate: Date;
}
