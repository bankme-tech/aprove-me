import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateAssignorDto {
  @IsString()
  @IsNotEmpty()
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

}

export class CreatePayableAssignorDto {
  @ValidateNested()
  @Type(() => CreateAssignorDto)
  assignor: CreateAssignorDto;

  @ValidateNested({ each: true })
  @Type(() => CreatePayableDto)
  payables: CreatePayableDto[];
}
