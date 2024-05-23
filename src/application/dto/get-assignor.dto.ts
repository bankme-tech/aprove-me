import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { GetReceivableDto } from './get-receivable.dto';

export class GetAssignorDto {
  @IsString()
  @Expose({ name: 'document' })
  document: string;

  @IsEmail()
  @Expose({ name: 'email' })
  email: string;

  @IsString()
  @Expose({ name: 'phone' })
  phone: string;

  @IsString()
  @Expose({ name: 'name' })
  name: string;

  @IsOptional()
  @IsArray()
  @Type(() => GetReceivableDto)
  @ValidateNested({ each: true })
  receivables?: GetReceivableDto[];

  constructor(props: GetAssignorDtoProps) {
    this.document = props.document;
    this.email = props.email;
    this.phone = props.phone;
    this.name = props.name;
    this.receivables = props?.receivables;
  }
}

export type GetAssignorDtoProps = {
  document: string;
  email: string;
  phone: string;
  name: string;
  receivables?: {
    emissionDate: Date;
    value: number;
  }[];
};
