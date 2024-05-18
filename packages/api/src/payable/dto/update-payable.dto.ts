import { IsNumber } from 'class-validator';

export class UpdatePayableDto {
  @IsNumber()
  value?: number;
}
