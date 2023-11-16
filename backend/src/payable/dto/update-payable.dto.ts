import { PartialType } from '@nestjs/mapped-types';
import { CreatePayableDto } from './create-payable.dto';
import { IsNumber, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class UpdatePayableDto extends PartialType(CreatePayableDto) {
  @IsNumber({}, { message: 'The value field must be a number.' })
  @IsNotEmpty({ message: 'The value field cannot be empty.' })
  @IsOptional()
  value?: number;

  @IsDateString({}, { message: 'The emissionDate field must be a valid date.' })
  @IsNotEmpty({ message: 'The emissionDate field cannot be empty.' })
  @IsOptional()
  emissionDate?: Date;

  @IsNumber({}, { message: 'The assignorId field must be a number.' })
  @IsNotEmpty({ message: 'The assignorId field cannot be empty.' })
  @IsOptional()
  assignorId?: number;
}
