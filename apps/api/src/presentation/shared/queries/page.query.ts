import { ApiPropertyOptional } from '@nestjs/swagger';

import { IPageQuery } from '@domain/shared/page-query.interface';

import { Type } from 'class-transformer';
import { IsOptional, Min, IsInt, Max } from 'class-validator';

export class PageQuery implements IPageQuery {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @Type(() => Number)
  @IsOptional()
  @Min(1, { message: 'Page must not be less than 1' })
  @IsInt({ message: 'Page must be an integer number' })
  page = 1;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @Type(() => Number)
  @IsOptional()
  @Min(1, { message: 'Limit must not be less than 1' })
  @Max(100, { message: 'Limit must not greater than 100' })
  @IsInt({ message: 'Limit must be an integer number' })
  limit = 10;
}
