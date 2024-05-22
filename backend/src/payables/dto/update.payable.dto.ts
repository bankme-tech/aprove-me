import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class UpdatePayableDto {
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
