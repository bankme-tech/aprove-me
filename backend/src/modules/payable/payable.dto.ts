import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { BaseModel } from 'src/models/baseModel.dto';

export class CreatePayableDto extends BaseModel {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  value: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  assignorId: string;
}
