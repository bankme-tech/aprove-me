import { IsUUID, IsNumber } from 'class-validator';

export class CreatePayableDto {
  @IsNumber()
  value: number;

  @IsUUID()
  assignor: string;
}
