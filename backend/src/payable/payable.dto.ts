import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsNumber,
  Min,
  ValidateNested,
  Length,
} from 'class-validator';

class CreateGrantorDto {
  @IsUUID()
  id: string;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  @Length(1, 50)
  document: string;
}

export class CreatePayableDto {
  @IsUUID()
  id: string;

  @IsString()
  @Length(1, 100)
  description: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @ValidateNested()
  @Type(() => CreateGrantorDto)
  grantor: CreateGrantorDto;
}
