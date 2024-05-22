import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { maxLengthMessage } from 'src/utils/max-length-message';

export class CreateAssignorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: maxLengthMessage('document', 30) })
  document: string;

  @IsEmail({}, { message: 'invalid email' })
  @MaxLength(140, { message: maxLengthMessage('email', 140) })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: maxLengthMessage('phone', 20) })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(140, { message: maxLengthMessage('name', 140) })
  name: string;
}

export class UpdateAssignorDto extends PartialType(CreateAssignorDto) {}
