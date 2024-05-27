import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { PaginationDto } from "src/dtos/pagination.dto";

export class PayablePaginationDto extends PaginationDto {
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  includeAssignor: boolean;
}

export class PayableByIdDto {
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  includeAssignor: boolean;
}
