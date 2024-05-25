import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDto {
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
