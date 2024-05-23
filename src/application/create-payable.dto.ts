import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class ReceivableDto {
  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'value' })
  value: number;

  @IsDateString()
  @IsNotEmpty()
  emissionDate: Date;
}

export class CreatePayableDto {
  @IsString()
  @Expose({ name: 'document' })
  @IsNotEmpty()
  @Length(1, 30)
  document: string;

  @IsEmail()
  @Expose({ name: 'email' })
  @IsNotEmpty()
  @Length(1, 140)
  email: string;

  @IsString()
  @Expose({ name: 'phone' })
  @IsNotEmpty()
  @Length(1, 20)
  phone: string;

  @IsString()
  @Expose({ name: 'name' })
  @IsNotEmpty()
  @Length(1, 140)
  name: string;

  @IsArray()
  @Type(() => ReceivableDto)
  @ValidateNested({ each: true })
  @Expose({ name: 'receivables' })
  receivables: ReceivableDto[];
}
