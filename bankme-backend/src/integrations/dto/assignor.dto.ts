import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsUUID, Length, MaxLength } from 'class-validator';

export class AssignorDto {
  @IsUUID()
  id: string;

  @IsString()
  @Length(1, 30)
  @MaxLength(30)
  document: string;

  @IsEmail()
  @Length(1, 140)
  email: string;

  @IsString()
  @Length(1, 20)
  phone: string;

  @IsString()
  @Length(1, 140)
  name: string;
}

export class CreateAssignorDto extends OmitType(AssignorDto, ['id']) {}

export class UpdateAssignorDto extends PartialType(AssignorDto) {}
