import { IsNotEmpty } from 'class-validator';
import Payable from '../entity/Payable';
import { ApiProperty } from '@nestjs/swagger';

export default class PayableCreationDto {
  @ApiProperty({
    example: '2123.45',
    required: true,
  })
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    example: '2021-09-01',
    required: true,
  })
  @IsNotEmpty()
  emissionDate: Date;

  @ApiProperty({
    example: '9fe7de00-6f6c-45e2-8dfe-737f945614ef',
    required: true,
  })
  @IsNotEmpty()
  assignorId: string;

  constructor(value?: number, emissionDate?: Date, assignorId?: string) {
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }

  toEntity(): Payable {
    const payable = new Payable();

    payable.value = this.value;
    payable.emissionDate = this.emissionDate;
    payable.assignorId = this.assignorId;

    return payable;
  }
}
