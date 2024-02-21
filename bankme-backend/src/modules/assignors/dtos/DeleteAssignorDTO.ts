import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteAssignorParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class DeleteAssignorDataDTO {
  id: number;
}
