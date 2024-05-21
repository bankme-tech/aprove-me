import { ApiProperty } from '@nestjs/swagger';

import { ICreatePayable } from '@domain/payable/interfaces/create-payable.interface';

import { CreateAssignorDto } from '@presentation/assignor/dtos/create-assignor.dto';

import { Type } from 'class-transformer';
import { IsDateString, IsNumber, ValidateNested } from 'class-validator';

export class CreatePayableDto implements ICreatePayable {
  @ApiProperty({ example: 100.21 })
  @IsNumber({}, { message: 'Value must be a valid number' })
  value!: number;

  @ApiProperty({ example: new Date() })
  @IsDateString({}, { message: 'Emission date must be valid date string' })
  emissionDate!: string;

  @ApiProperty({ type: CreateAssignorDto })
  @ValidateNested()
  @Type(() => CreateAssignorDto)
  assignor!: CreateAssignorDto;
}
