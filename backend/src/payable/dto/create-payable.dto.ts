import { ApiProperty } from '@nestjs/swagger';

export class CreatePayableDto {
  @ApiProperty()
  value: number;
  @ApiProperty()
  emissionDate: Date;
  @ApiProperty()
  assignorId: string;

  constructor(payable: {
    value: number;
    emissionDate: Date;
    assignorId: string;
  }) {
    this.value = payable.value;
    this.emissionDate = payable.emissionDate;
    this.assignorId = payable.assignorId;
  }
}
