import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseModel } from 'src/models/baseModel.dto';

export class AssignorDto extends BaseModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  document: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
