import { PartialType } from '@nestjs/mapped-types';
import { CreatePayableDto } from './create-payable.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePayableDto extends PartialType(CreatePayableDto) {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  assignor: string;
}
