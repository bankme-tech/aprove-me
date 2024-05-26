import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

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

  @Transform((o) => o.value ? o.value.split(',') : undefined)
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  selectKeys?: string[];
}
