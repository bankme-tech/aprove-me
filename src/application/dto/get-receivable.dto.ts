import { Expose, Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { GetAssignorDto, GetAssignorDtoProps } from './get-assignor.dto';

export class GetReceivableDto {
  @IsNumber()
  @Expose({ name: 'value' })
  value: number;

  @IsDateString()
  emissionDate: Date;

  @IsOptional()
  @Type(() => GetAssignorDto)
  @ValidateNested({ each: true })
  @Expose({ name: 'assignor' })
  assignor?: GetAssignorDto;

  constructor(props: GetReceivableDtoProps) {
    this.emissionDate = props.emissionDate;
    this.value = props.value;
    this.assignor = props?.assignor || undefined;
  }
}

export type GetReceivableDtoProps = {
  emissionDate: Date;
  value: number;
  assignor?: GetAssignorDtoProps;
};
