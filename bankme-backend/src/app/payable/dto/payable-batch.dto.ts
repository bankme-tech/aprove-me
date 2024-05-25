import { IsNumber, IsDate, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PayableBatchDto {
  @ValidateNested({ each: true })
  @Type(() => PayableDto)
  payables: PayableDto[];
}

class PayableDto {
  @IsNumber({}, { message: 'value must be a number' })
  value: number;

  @IsDate({ message: 'invalid date' })
  @Type(() => Date)
  emissionDate: Date;

  @IsUUID()
  assignorId: string;
}
