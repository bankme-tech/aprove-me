import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class ReceivableDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  emissionDate: Date;

  @IsUUID()
  @IsNotEmpty()
  assignorId: string;
}

export class UpdateReceivableDto {
  @IsOptional()
  @IsNumber()
  value?: number;

  @IsDateString()
  @IsOptional()
  emissionDate?: Date;

  @IsUUID()
  @IsOptional()
  assignorId?: string;
}
