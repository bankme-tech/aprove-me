import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserBodyDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

export class UpdateUserParamDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export class UpdateUserDataDTO {
  id: number;
  email: string;
  name: string;
}
