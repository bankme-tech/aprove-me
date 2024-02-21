import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteUserParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class DeleteUserDataDTO {
  id: number;
}
