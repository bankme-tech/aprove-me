import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export abstract class BaseModel {
  @IsUUID()
  @ApiProperty({ required: false })
  id: string;
}
