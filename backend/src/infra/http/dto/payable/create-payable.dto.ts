import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDTO {
  @IsNumber()
  value: number;

  @IsUUID()
  assignorId: string;

  @IsDateString()
  emissionDate: Date;
}
