import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsUUID
} from 'class-validator';

export class CreatePayableDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  value: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  assignorId: string;
}
