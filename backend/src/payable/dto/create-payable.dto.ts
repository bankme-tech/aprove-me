import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsUUID,
} from 'class-validator';

export class CreatePayableDto {
  @IsNotEmpty()
  @IsNumberString()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  emissionDate: Date;

  @IsNotEmpty()
  @IsUUID()
  assignor: string;
}
