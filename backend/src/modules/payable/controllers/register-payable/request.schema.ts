import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterPayableRequestSchema {
  @IsNotEmpty({ message: 'you must provide a value.' })
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @IsNotEmpty({ message: 'you must provide an emissionDate.' })
  @IsDateString()
  emissionDate: Date;

  @IsNotEmpty({ message: 'you must provide an assignor.' })
  assignor: string;
}
