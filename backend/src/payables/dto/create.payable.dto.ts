import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @Expose()
  @IsNotEmpty()
  @Type(() => Date)
  emissionDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsUUID()
  assignor: string;
}
