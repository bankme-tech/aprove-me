import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export abstract class BaseModel {
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  id: string;
}
