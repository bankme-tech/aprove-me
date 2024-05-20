import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsNumber,
  Min,
  ValidateNested,
  Length,
  IsNotEmpty,
} from 'class-validator';

class CreateAssignorDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;
}

export class CreatePayableDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  description: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @IsUUID()
  @IsNotEmpty()
  assignorId: string;
}

export class CreatePayableAssignorDto {
  @ValidateNested()
  @Type(() => CreateAssignorDto)
  assignor: CreateAssignorDto;

  @ValidateNested()
  @Type(() => CreatePayableDto)
  payable: CreatePayableDto;
}
