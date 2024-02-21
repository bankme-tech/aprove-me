import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindOneUserParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class FindOneUserDataDTO {
  id: number;
}
