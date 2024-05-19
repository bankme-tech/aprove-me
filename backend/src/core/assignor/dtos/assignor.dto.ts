import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import {
  MAX_DOCUMENT_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PHONE_LENGTH,
} from '../constants/max-length-fields.constants';

export class AssignorDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @MaxLength(MAX_DOCUMENT_LENGTH)
  document: string;

  @IsNotEmpty()
  @MaxLength(MAX_EMAIL_LENGTH)
  email: string;

  @IsNotEmpty()
  @MaxLength(MAX_PHONE_LENGTH)
  phone: string;

  @IsNotEmpty()
  @MaxLength(MAX_NAME_LENGTH)
  name: string;
}
