import { ApiProperty } from '@nestjs/swagger';

import { ICreatePayable } from '@domain/payable/interfaces/create-payable.interface';

import { CreateAssignorDto } from '@presentation/assignor/dtos/create-assignor.dto';

import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class CreatePayableDto implements ICreatePayable {
  @ApiProperty({ example: 100.21 })
  @IsDefined({ message: 'Value must be defined' })
  @IsNumber({}, { message: 'Value must be a valid number' })
  value!: number;

  @ApiProperty({ example: new Date() })
  @IsDefined({ message: 'Emission date must be defined' })
  @IsDateString({}, { message: 'Emission date must be valid date string' })
  emissionDate!: string;

  @ApiProperty({ type: CreateAssignorDto })
  @IsDefined({ message: 'Assignor must be defined' })
  @ValidateNested()
  @Type(() => CreateAssignorDto)
  assignor!: CreateAssignorDto;
}
