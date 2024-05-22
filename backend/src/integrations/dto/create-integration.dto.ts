import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class UpdatePayableDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @Expose()
  @IsNotEmpty()
  @Type(() => Date)
  emissionDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsUUID()
  assignor: string;
}

export class CreatePayableDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @Expose()
  @IsNotEmpty()
  @Type(() => Date)
  emissionDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsUUID()
  assignor: string;
}

export class UpdateAssignorDto {
  @Expose()
  @IsNotEmpty()
  @MaxLength(30)
  document: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(140)
  email: string;

  @Expose()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @Expose()
  @IsNotEmpty()
  @MaxLength(140)
  name: string;
}

export class CreateAssignorDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsNotEmpty()
  @MaxLength(30)
  document: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(140)
  email: string;

  @Expose()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @Expose()
  @IsNotEmpty()
  @MaxLength(140)
  name: string;
}
