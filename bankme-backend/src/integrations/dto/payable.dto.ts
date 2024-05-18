import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePayableDto {
  @IsNumber()
  value: number;

  @IsDate()
  @Type(() => Date)
  emissionDate: Date;

  @IsUUID()
  assignorId: string;
}

export class UpdatePayableDto extends PartialType(CreatePayableDto) {}
