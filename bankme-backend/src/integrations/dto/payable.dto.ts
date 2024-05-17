import { PartialType } from '@nestjs/mapped-types';
import { ValidateNested, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AssignorDto } from './assignor.dto';
import { ReceivableDto } from './receivable.dto';

export class PayableDto {
  @ValidateNested()
  @Type(() => AssignorDto)
  @IsNotEmpty()
  assignor: AssignorDto;

  @ValidateNested()
  @Type(() => ReceivableDto)
  @IsNotEmpty()
  receivable: ReceivableDto;
}

class PartialAssignor extends PartialType(AssignorDto) {}
class PartialReceivable extends PartialType(ReceivableDto) {}

export class UpdatePayableDto {
  @ValidateNested()
  @Type(() => PartialAssignor)
  @IsOptional()
  assignor: PartialAssignor;

  @ValidateNested()
  @Type(() => PartialReceivable)
  @IsOptional()
  receivable: PartialReceivable;
}
