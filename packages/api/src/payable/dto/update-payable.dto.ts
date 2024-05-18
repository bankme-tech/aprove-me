import { IsNumber } from 'class-validator';

export class CreatePayableDto {
  @IsNumber()
  value?: number;
}
