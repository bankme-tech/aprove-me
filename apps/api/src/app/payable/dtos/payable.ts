import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Length,
} from 'class-validator';

export class CreatePayableDTO {
  @IsNotEmpty({ message: 'value is required' })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    { message: 'value must be a valid number' },
  )
  value: number;

  @IsNotEmpty()
  @Length(10, 10, { message: 'emissionDate must be follow format xxxx-xx-xx' })
  emissionDate: string;

  @IsNotEmpty({ message: 'assignorId is required' })
  @IsUUID(4, { message: 'invalid assignor id' })
  assignorId: string;
}

export class UpdatePayableDTO {
  @IsNotEmpty({ message: 'value is required' })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    { message: 'value must be a valid number' },
  )
  @IsOptional()
  value?: number;

  @IsNotEmpty()
  @Length(10, 10, { message: 'emissionDate must be follow format xxxx-xx-xx' })
  @IsOptional()
  emissionDate?: string;

  @IsNotEmpty({ message: 'assignorId is required' })
  @IsUUID(4, { message: 'invalid assignor id' })
  @IsOptional()
  assignorId?: string;
}
