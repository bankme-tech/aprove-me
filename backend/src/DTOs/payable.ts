import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class PayableDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  emissionDate: Date;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  assignor: string;
}
