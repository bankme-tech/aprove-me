import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

export class PayableDto {
  id: string;

  @IsNotEmpty({ message: MessagesHelper.NULLABLE_FIELD + '$property' })
  value: number;

  @IsNotEmpty({ message: MessagesHelper.NULLABLE_FIELD + '$property' })
  emission_date: Date;

  @IsNotEmpty({ message: MessagesHelper.NULLABLE_FIELD + '$property' })
  id_assignor: string;
}
