import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateAssignorBodyDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  document: string;
}

export class UpdateAssignorParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class UpdateAssignorDataDTO {
  id: number;
  email: string;
  name: string;
  phone: string;
  document: string;
}
