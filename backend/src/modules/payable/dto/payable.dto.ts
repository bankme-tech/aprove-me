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
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  value: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  assignorId: string;

  @ApiProperty()
  @IsDateString()
  emissionDate: Date;
}
