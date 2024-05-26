import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  Min,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateAssignorDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 140)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  document: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 140)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  phone: string;
}

export class CreatePayableDto {
  // @IsString()
  // @IsNotEmpty()
  // @Length(1, 100)
  // description: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  emissionDate: string;
}

export class CreatePayableAssignorDto {
  @ValidateNested({ each: true })
  @Type(() => CreateAssignorDto)
  assignor: CreateAssignorDto | string;

  @ValidateNested({ each: true })
  @Type(() => CreatePayableDto)
  payables: CreatePayableDto[];
}
