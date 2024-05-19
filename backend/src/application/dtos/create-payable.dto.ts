import { IsDate, IsDecimal, IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePayableDto {
  @IsDecimal()
  @IsNotEmpty()
  value: number;

  @IsDate()
  @IsNotEmpty()
  emissionDate: Date;

  @IsUUID()
  @IsNotEmpty()
  assignor: string;
}