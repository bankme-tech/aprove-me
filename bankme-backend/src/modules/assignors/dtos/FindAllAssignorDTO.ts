import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindAllAssignorQueryDTO {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  offset: number;
}

export class FindAllAssignorDataDTO {
  email: string;
  name: string;
  phone: string;
  document: string;
  limit: number;
  offset: number;
}
