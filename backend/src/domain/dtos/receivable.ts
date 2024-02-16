import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreateReceivableDto {
  @IsNumber()
  value: number;

  @IsDateString()
  emission_date: Date;

  @IsUUID()
  assignor_id: string;
}

export class UpdateReceivableDto extends PartialType(CreateReceivableDto) {}
