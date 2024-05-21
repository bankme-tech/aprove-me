import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UpdatePayableRequestSchema {
  @IsNotEmpty({ message: 'you must provide a value.' })
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @IsNotEmpty({ message: 'you must provide an emissionDate.' })
  @IsDateString()
  emissionDate: Date;

  @IsNotEmpty({ message: 'you must provide an assignor.' })
  @IsUUID()
  assignorId: string;
}
