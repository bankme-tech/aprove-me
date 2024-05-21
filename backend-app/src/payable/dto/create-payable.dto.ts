import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsUUID()
  assignor: string;
}
