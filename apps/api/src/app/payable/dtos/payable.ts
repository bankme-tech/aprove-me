import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Length,
} from 'class-validator';
import { PayableValidationError } from '../constants/validation-error';

export class CreatePayableDTO {
  @IsNotEmpty({ message: PayableValidationError.VALUE_REQUIRED })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    { message: PayableValidationError.VALUE_INVALID },
  )
  value: number;

  @IsNotEmpty()
  @Length(10, 10, {
    message: PayableValidationError.EMISSION_DATE_INVALID_FORMAT,
  })
  emissionDate: string;

  @IsNotEmpty({ message: PayableValidationError.ASSIGNOR_ID_REQUIRED })
  @IsUUID(4, { message: PayableValidationError.INVALID_ASSIGNOR_ID })
  assignorId: string;
}

export class UpdatePayableDTO {
  @IsNotEmpty({ message: PayableValidationError.VALUE_REQUIRED })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    { message: PayableValidationError.VALUE_INVALID },
  )
  @IsOptional()
  value?: number;

  @IsNotEmpty()
  @Length(10, 10, {
    message: PayableValidationError.EMISSION_DATE_INVALID_FORMAT,
  })
  @IsOptional()
  emissionDate?: string;

  @IsNotEmpty({ message: PayableValidationError.ASSIGNOR_ID_REQUIRED })
  @IsUUID(4, { message: PayableValidationError.INVALID_ASSIGNOR_ID })
  @IsOptional()
  assignorId?: string;
}
