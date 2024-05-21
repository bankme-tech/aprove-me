import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreatePayableDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  value: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  assignorId: string;
}
