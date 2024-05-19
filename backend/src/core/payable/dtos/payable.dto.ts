import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class PayableDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  emissionDate: Date;

  @IsNotEmpty()
  @IsUUID()
  assignor: string;
}
