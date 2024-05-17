import { ValidateNested, IsNotEmpty } from 'class-validator';
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
