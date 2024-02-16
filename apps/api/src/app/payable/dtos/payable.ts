import { IsNotEmpty, IsNumber, IsUUID, Length } from 'class-validator';

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
