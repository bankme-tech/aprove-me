import { ApiProperty } from '@nestjs/swagger';
import { PayableVO } from 'bme/core/domains/payables/vos/payable.vo';

export class CreatePayableDto {
  @ApiProperty()
  public value: number;
  @ApiProperty()
  public emissionDate: Date;
  @ApiProperty()
  public assignorId: string;

  public toValueObject(): PayableVO {
    return new PayableVO('', this.value, this.emissionDate, this.assignorId);
  }
}
