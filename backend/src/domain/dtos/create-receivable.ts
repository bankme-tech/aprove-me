import { IsDate, IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreateReceivableDto {
  @IsNumber()
  value: number;

  @IsDateString()
  emissionDate: Date;

  @IsUUID()
  assignor_id: string;
}
