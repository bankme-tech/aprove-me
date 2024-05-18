import { IsDate, IsNumber } from 'class-validator';

export class CreatePayableDTO {
  @IsNumber()
  value: number;

  @IsDate()
  emissionDate: Date;
}
