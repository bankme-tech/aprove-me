import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeletePayableParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class DeletePayableDataDTO {
  id: number;
}
