import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindOneAssignorParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class FindOneAssignorDataDTO {
  id: number;
}
