import { IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePayableDto {
  @IsNumber({}, { message: 'The value field must be a number.' })
  @IsNotEmpty({ message: 'The value field cannot be empty.' })
  value: number;

  @IsDateString({}, { message: 'The emissionDate field must be a valid date.' })
  @IsNotEmpty({ message: 'The emissionDate field cannot be empty.' })
  emissionDate: Date;

  @IsNumber({}, { message: 'The assignorId field must be a number.' })
  @IsNotEmpty({ message: 'The assignorId field cannot be empty.' })
  assignorId: number;
}
