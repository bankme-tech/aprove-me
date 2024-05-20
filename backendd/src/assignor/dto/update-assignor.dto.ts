import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignorDto } from './create-assignor.dto';
import { IsString, MaxLength } from 'class-validator';

export class UpdateAssignorDto extends PartialType(CreateAssignorDto) {
  @IsString()
  @MaxLength(30)
  document: string;

  @IsString()
  @MaxLength(140)
  email: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsString()
  @MaxLength(140)
  name: string;
}
