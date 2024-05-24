import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { PayableEntity } from '../entities/payable.entity';
import { IdValidator } from '../validators/payable-id.validator';
import { UUID } from 'crypto';

export class UpdatePayableInputParamsDTO extends IdValidator {}

export class UpdatePayableInputBodyDTO extends PickType(PayableEntity, [
  'value',
  'assignorId',
]) {
  @IsOptional()
  @IsNumber({}, { message: 'Value must be a number' })
  public value: number;

  @IsOptional()
  @IsUUID('all', { message: 'AssignorId must be a valid UUID' })
  public assignorId: UUID;
}

export type UpdatePayableInputDTO = UpdatePayableInputParamsDTO &
  Partial<UpdatePayableInputBodyDTO>;
