import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePayableDto {
  @IsNumber({}, { message: 'value must be a number' })
  value: number;

  @IsDate({ message: 'invalid date' })
  @Type(() => Date)
  emissionDate: Date;

  @IsUUID()
  assignorId: string;
}

export class UpdatePayableDto extends PartialType(CreatePayableDto) {}
