import { IsNumber, IsString } from 'class-validator';

export class CreatePayableDto {
  @IsNumber()
  value: number;

  @IsString()
  assignorId: string;
}
