import { IsOptional, ValidateNested } from "class-validator";
import { ReceivableDto } from "./receivable.dto";
import { AssignorDto } from "./assignor.dto";
import { Type } from "class-transformer";

export class CreateReceivableDto {
  @ValidateNested()
  @Type(() => ReceivableDto)
  receivableData: ReceivableDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AssignorDto)
  assignorData?: AssignorDto;
}