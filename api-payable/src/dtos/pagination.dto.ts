import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class PaginationDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  page: number = 1;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  limit: number = 10;

  @IsOptional()
  @IsString()
  cursorId?: string;
}
