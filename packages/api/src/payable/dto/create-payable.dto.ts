import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePayableDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  assignorId: string;
}
