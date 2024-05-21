import { ApiProperty } from '@nestjs/swagger';

import { ICreateAssignor } from '@domain/assignor/interfaces/create-assignor.interface';

import { IsDefined, IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateAssignorDto implements ICreateAssignor {
  @ApiProperty({ example: '37872471060' })
  @IsDefined({ message: 'Document must be defined' })
  @IsString({ message: 'Document must be a string' })
  @MaxLength(140, { message: 'Document length must be greater than 20' })
  document!: string;

  @ApiProperty({ example: 'jane.doe@bankme.com' })
  @IsDefined({ message: 'Email must be defined' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  @MaxLength(140, { message: 'Email length must be greater than 20' })
  email!: string;

  @ApiProperty({ example: '15988776655' })
  @IsDefined({ message: 'Phone must be defined' })
  @IsString({ message: 'Phone must be a string' })
  @MaxLength(20, { message: 'Phone length must be greater than 20' })
  phone!: string;

  @ApiProperty({ example: 'Jane Doe' })
  @IsDefined({ message: 'Name must be defined' })
  @IsString({ message: 'Name must be a string' })
  @MaxLength(140, { message: 'Name length must be greater than 20' })
  name!: string;
}
