import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePayableDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  assignorId: string;
}
