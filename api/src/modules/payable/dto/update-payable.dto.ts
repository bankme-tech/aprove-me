import { IsDateString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdatePayableDTO {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  value?: number;

  @IsDateString()
  @IsOptional()
  emissionDate?: Date;

  @IsUUID()
  @IsOptional()
  assignor?: string;
}
