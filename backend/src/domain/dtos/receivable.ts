import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { Receivable } from '../entities';

export class CreateReceivableDto {
  @IsNumber()
  value: number;

  @IsDateString()
  emission_date: Date;

  @IsUUID()
  assignor_id: string;
}

export class UpdateReceivableDto extends PartialType(CreateReceivableDto) {}

export class CreateReceivableBatchDto {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10000)
  receivable_batch: CreateReceivableDto[];

  @IsEmail()
  email: string;
}
