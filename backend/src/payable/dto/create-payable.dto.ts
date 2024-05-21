import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePayableDto {
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Value must be a number' })
  @IsNotEmpty({ message: 'Value is required' })
  value: number;

  @IsUUID('4', { message: 'Assignor ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Assignor ID is required' })
  assignorId: string;
}
