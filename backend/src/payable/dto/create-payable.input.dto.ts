import { IsDateString, IsNumber, IsUUID } from 'class-validator';
import { PayableEntity } from '../entities/payable.entity';
import { UUID } from 'crypto';
import { PickType } from '@nestjs/mapped-types';

export class CreatePayableInputDTO extends PickType(PayableEntity, [
  'value',
  'assignorId',
  'emissionDate',
]) {
  @IsNumber({}, { message: 'Value must be a number' })
  public value: number;

  @IsUUID('all', { message: 'AssignorId must be a valid UUID' })
  public assignorId: UUID;

  @IsDateString({}, { message: 'Emission date must be a valid date' })
  public emissionDate: Date;
}
