import { IsNumber, IsPositive } from 'class-validator';

export class FindAllDTO {
  @IsNumber()
  @IsPositive()
  skip: number;

  @IsNumber()
  @IsPositive()
  take: number;
}
