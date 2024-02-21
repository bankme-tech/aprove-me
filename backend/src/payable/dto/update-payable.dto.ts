import { PartialType } from '@nestjs/mapped-types';
import { CreatePayableDto } from './create-payable.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdatePayableDto extends PartialType(CreatePayableDto) {
  @IsNotEmpty()
  @IsString()
  value: number;

  @IsNotEmpty()
  @IsString()
  assignorId: string;
}
