import { Type } from 'class-transformer';
import { InputPayableDTO } from './input-payable.dto';
import { ValidateNested } from 'class-validator';
import { InputAssignorDTO } from 'src/assignor/dto/input-assignor.dto';

export class InputDisplayPayableDTO {
  @ValidateNested()
  @Type(() => InputPayableDTO)
  public payable: InputPayableDTO;

  @ValidateNested()
  @Type(() => InputAssignorDTO)
  public assignor: InputAssignorDTO;
}
