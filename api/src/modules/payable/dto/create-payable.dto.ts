import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDTO {
  @IsUUID()
  id: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @IsDateString()
  emissionDate: Date;

  @IsUUID()
  assignor: string;
}
