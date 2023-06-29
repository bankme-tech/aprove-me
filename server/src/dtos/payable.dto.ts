import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ReceivableDto } from './receivable.dto';
import { AssignorDto } from './assignor.dto';

export class PayableDto {
  @ValidateNested()
  @Type(() => ReceivableDto)
  @IsNotEmpty()
  receivable: ReceivableDto;

  @ValidateNested()
  @Type(() => AssignorDto)
  @IsNotEmpty()
  assignor: AssignorDto;
}
