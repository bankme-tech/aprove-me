import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import { PayableValidationError } from '../constants/validation-error';
import { Type } from 'class-transformer';

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

export class CreatePayableBatchDTO {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(10000)
  @ValidateNested({ each: true })
  @Type(() => CreatePayableDTO)
  data: CreatePayableDTO[];
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
