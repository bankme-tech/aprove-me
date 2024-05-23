import { Expose, Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class AssignorDto {
  @IsString()
  @Expose({ name: 'document' })
  @Length(1, 30)
  document: string;

  @IsEmail()
  @Expose({ name: 'email' })
  @Length(1, 140)
  email: string;

  @IsString()
  @Expose({ name: 'phone' })
  @Length(1, 20)
  phone: string;

  @IsString()
  @Expose({ name: 'name' })
  @Length(1, 140)
  name: string;
}

export class ReceivableDto {
  @IsNumber()
  @Expose({ name: 'value' })
  value: number;

  @IsDateString()
  emissionDate: Date;

  @Type(() => AssignorDto)
  @ValidateNested({ each: true })
  @Expose({ name: 'assignor' })
  assignor: AssignorDto;

  constructor(props: ReceivableDtoProps) {
    this.emissionDate = props.emissionDate;
    this.value = props.value;
    this.assignor = {
      document: props.assignor.document,
      email: props.assignor.email,
      phone: props.assignor.phone,
      name: props.assignor.name
    }; 
  }
}

export type ReceivableDtoProps = {
  emissionDate: Date;
  value: number;
  assignor: {
    document: string;
    email: string;
    phone: string;
    name: string;
  };
};
