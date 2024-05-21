import { ApiPropertyOptional } from '@nestjs/swagger';

import { IUpdateAssignor } from '@domain/assignor/interfaces/update-assignor.interface';

import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAssignorDto implements IUpdateAssignor {
  @ApiPropertyOptional({ example: '37872471060' })
  @IsOptional()
  @IsString({ message: 'Document must be a string' })
  @MaxLength(140, { message: 'Document length must be greater than 20' })
  document?: string;

  @ApiPropertyOptional({ example: 'jane.doe@bankme.com' })
  @IsOptional()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  @MaxLength(140, { message: 'Email length must be greater than 20' })
  email?: string;

  @ApiPropertyOptional({ example: '15988776655' })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @MaxLength(20, { message: 'Phone length must be greater than 20' })
  phone?: string;

  @ApiPropertyOptional({ example: 'Jane Doe' })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(140, { message: 'Name length must be greater than 20' })
  name?: string;
}
