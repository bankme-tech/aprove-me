import { IsArray, ValidateNested } from "class-validator";
import { PayableDto } from "./payables.dto";
import { Type } from "class-transformer";

export class BatchPayableDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PayableDto)
  payables: PayableDto[];
}
