import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsUUID()
  @IsNotEmpty()
  assignorId: string;
}
