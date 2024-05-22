import { IsUUID, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePayableDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsUUID()
  assignor: string;
}
