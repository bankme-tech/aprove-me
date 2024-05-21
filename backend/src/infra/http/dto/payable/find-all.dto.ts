import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindAllDTO {
  @IsInt()
  @Type(() => Number)
  skip: number;

  @IsInt()
  @Type(() => Number)
  take: number;
}
