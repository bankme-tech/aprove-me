import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePayableBodyDTO {
  @ApiProperty()
  @IsNotEmpty()
  value: number;
}

export class UpdatePayableParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class UpdatePayableDataDTO {
  id: number;
  value: number;
  valueInCents: number;
}
