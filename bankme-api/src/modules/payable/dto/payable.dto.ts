import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class PayableDto {
  @IsNumber({}, {message: 'The "value" field must be a number.'})
  @IsNotEmpty({message: 'The "value" field cannot be empty'})
  value: number;

  @IsDateString({}, {message: 'The "emissionDate" field must be a date.'})
  @IsNotEmpty({message: 'The "emissionDate" field cannot be empty'})
  emissionDate: Date;

  @IsNumber({}, {message: 'The "assignorId" field must be a number.'})
  @IsNotEmpty({message: 'The "assignorId" field cannot be empty'})
  assignorId: number;
}