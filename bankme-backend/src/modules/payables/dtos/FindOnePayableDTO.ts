import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindOnePayableParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class FindOnePayableDataDTO {
  id: number;
}
