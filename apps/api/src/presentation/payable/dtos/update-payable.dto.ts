import { ApiProperty } from '@nestjs/swagger';

import { IUpdatePayable } from '@domain/payable/interfaces/update-payable.interface';

import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePayableDto implements IUpdatePayable {
  @ApiProperty({ example: 100.21 })
  @IsOptional()
  @IsNumber({}, { message: 'Value must be a valid number' })
  value?: number;

  @ApiProperty({ example: new Date() })
  @IsOptional()
  @IsDateString({}, { message: 'Emission date must be valid date string' })
  emissionDate?: string;
}
