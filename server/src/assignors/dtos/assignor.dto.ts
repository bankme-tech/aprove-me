import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

export class AssignorDto {
  id: string;

  @IsNotEmpty({ message: MessagesHelper.NULLABLE_FIELD + '$property' })
  @MaxLength(30, { message: MessagesHelper.VERIFY_LENGHT_STRING + '$property' })
  document: string;

  @IsNotEmpty({ message: MessagesHelper.NULLABLE_FIELD + '$property' })
  @MaxLength(140, {
    message: MessagesHelper.VERIFY_LENGHT_STRING + '$property',
  })
  @IsEmail({}, { message: MessagesHelper.CHECK_EMAIL })
  email: string;

  @IsNotEmpty({ message: MessagesHelper.NULLABLE_FIELD + '$property' })
  @MaxLength(20, { message: MessagesHelper.VERIFY_LENGHT_STRING + '$property' })
  phone: string;

  @IsNotEmpty({ message: MessagesHelper.NULLABLE_FIELD + '$property' })
  @MaxLength(140, {
    message: MessagesHelper.VERIFY_LENGHT_STRING + '$property',
  })
  name: string;
}
