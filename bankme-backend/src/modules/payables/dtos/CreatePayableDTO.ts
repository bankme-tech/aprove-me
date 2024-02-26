import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePayableBodyDTO {
  @ApiProperty()
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  assignorId: number;

  @ApiProperty()
  @IsNotEmpty()
  userId: number;
}

export class CreatePayableDataDTO {
  value: number;
  valueInCents: number;
  emissionDate: Date;
  userId: number;
  assignorId: number;
}
