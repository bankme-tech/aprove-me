import { IsUUID, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ReceivableDto {
  @IsUUID()
  id: string;

  @IsNumber()
  value: number;

  @IsDate()
  @Type(() => Date)
  emissionDate: Date;

  @IsUUID()
  assignorId: string;
}
