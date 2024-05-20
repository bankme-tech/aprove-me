import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export class EditPayableDTO {
  @IsNumber()
  value: number;

  @IsUUID()
  assignorId: string;

  @IsDateString()
  emissionDate: Date;
}
