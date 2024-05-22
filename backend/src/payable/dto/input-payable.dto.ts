import { IsDateString, IsNumber, IsUUID } from 'class-validator';
import { Payable } from '../entities/payable.entity';
import { UUID } from 'crypto';

export class InputPayableDTO extends Payable {
  @IsUUID('all', { message: 'id must be a valid UUID' })
  public id: UUID;

  @IsNumber({}, { message: 'Value must be a number' })
  public value: number;

  @IsDateString({}, { message: 'Emission date must be a valid date' })
  public emissionDate: Date;

  @IsUUID('all', { message: 'Assignor must be a valid UUID' })
  public assignor: UUID;
}
