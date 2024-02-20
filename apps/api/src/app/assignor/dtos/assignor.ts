import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { AssignorValidationError } from '../constants/validation-error';

export class CreateAssignorDTO {
  @IsNotEmpty({ message: AssignorValidationError.DOCUMENT_REQUIRED })
  @MaxLength(30, { message: AssignorValidationError.DOCUMENT_MAX_30_ERROR })
  document: string;

  @IsNotEmpty({ message: AssignorValidationError.EMAIL_REQUIRED })
  @IsEmail({}, { message: AssignorValidationError.INVALID_EMAIL })
  @MaxLength(140, { message: AssignorValidationError.EMAIL_MAX_140_ERROR })
  email: string;

  @IsNotEmpty({ message: AssignorValidationError.PHONE_REQUIRED })
  @MaxLength(20, { message: AssignorValidationError.PHONE_MAX_20_ERROR })
  phone: string;

  @IsNotEmpty({ message: AssignorValidationError.NAME_REQUIRED })
  @MaxLength(140, { message: AssignorValidationError.NAME_MAX_140_ERROR })
  name: string;
}

export class UpdateAssignorDTO {
  @IsNotEmpty()
  @MaxLength(30, { message: AssignorValidationError.DOCUMENT_MAX_30_ERROR })
  @IsOptional()
  document?: string;

  @IsNotEmpty()
  @IsEmail({}, { message: AssignorValidationError.INVALID_EMAIL })
  @MaxLength(140, { message: AssignorValidationError.EMAIL_MAX_140_ERROR })
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @MaxLength(20, { message: AssignorValidationError.PHONE_MAX_20_ERROR })
  @IsOptional()
  phone?: string;

  @IsNotEmpty()
  @MaxLength(140, { message: AssignorValidationError.NAME_MAX_140_ERROR })
  @IsOptional()
  name?: string;
}
