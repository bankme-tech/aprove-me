import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsDate()
  emissionDate: Date;

  @IsNotEmpty()
  @IsUUID()
  assignor: string;
}
