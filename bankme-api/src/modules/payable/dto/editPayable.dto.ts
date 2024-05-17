import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class EditPayableDto {
  @IsNumber({}, {message: 'The "value" field must be a number.'})
  @IsNotEmpty({message: 'The "value" field cannot be empty'})
  @IsOptional()
  value: number;

  @IsDateString({}, {message: 'The "emissionDate" field must be a date.'})
  @IsNotEmpty({message: 'The "emissionDate" field cannot be empty'})
  @IsOptional()
  emissionDate: Date;

  @IsNumber({}, {message: 'The "assignorId" field must be a number.'})
  @IsNotEmpty({message: 'The "assignorId" field cannot be empty'})
  @IsOptional()
  assignorId: number;
}