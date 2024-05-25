import { Type } from 'class-transformer';
import { CreatePayableInputDTO } from './create-payable.input.dto';
import { ArrayMaxSize, ValidateNested } from 'class-validator';

export class BatchInputDTO {
  @ValidateNested()
  @Type(() => CreatePayableInputDTO)
  @ArrayMaxSize(10000)
  public payables: CreatePayableInputDTO[];
}
