import { AssignorEntity } from '../entities/assignor.entity';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { IdValidator } from '../validators/assignor-id.validator';
import { PickType } from '@nestjs/mapped-types';

export class UpdateAssignorInputParamsDTO extends IdValidator {}

export class UpdateAssignorInputBodyDTO extends PickType(AssignorEntity, [
  'document',
  'email',
  'phone',
  'name',
]) {
  @IsOptional()
  @MaxLength(30, {
    message: 'Document must be less than or equal to 30 characters',
  })
  @IsString({ message: 'Document must be a string' })
  public document: string;

  @IsOptional()
  @MaxLength(140, {
    message: 'Email must be less than or equal to 140 characters',
  })
  @IsString({ message: 'Email must be a string' })
  public email: string;

  @IsOptional()
  @MaxLength(20, {
    message: 'Phone must be less than or equal to 20 characters',
  })
  @IsString({ message: 'Phone must be a string' })
  public phone: string;

  @IsOptional()
  @MaxLength(140, {
    message: 'Name must be less than or equal to 140 characters',
  })
  @IsString({ message: 'Name must be a string' })
  public name: string;
}

export type UpdateAssignorInputDTO = UpdateAssignorInputParamsDTO &
  Partial<UpdateAssignorInputBodyDTO>;
