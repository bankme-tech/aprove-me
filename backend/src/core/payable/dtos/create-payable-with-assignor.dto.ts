import { ValidateNested } from 'class-validator';

import { AssignorDto } from '../../../core/assignor/dtos/assignor.dto';
import { PayableDto } from './payable.dto';
import { Type } from 'class-transformer';
import { IsAssignorMatching } from 'src/core/assignor/decorator/is-assignor-matching.decorator';

export class CreatePayableWithAssignorDto {
  @ValidateNested({ each: true })
  @Type(() => PayableDto)
  @IsAssignorMatching('assignor', {
    message: 'The assignor in payable does not match',
  })
  payable: PayableDto;

  @ValidateNested({ each: true })
  @Type(() => AssignorDto)
  assignor: AssignorDto;
}
