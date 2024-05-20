import { PartialType } from '@nestjs/mapped-types';
import { CreatePayableDto } from './create-payable.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePayableDto extends PartialType(CreatePayableDto) {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  assignorId: string;
}
