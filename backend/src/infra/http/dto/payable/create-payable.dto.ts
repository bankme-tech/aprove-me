import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDTO {
  @IsNumber()
  value: number;

  @IsUUID()
  assignorId: string;

  @IsDate()
  emissionDate: Date;
}
