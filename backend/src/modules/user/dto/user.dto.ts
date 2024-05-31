import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from 'src/models/baseModel.dto';

export class UserDto extends BaseModel {
  @IsString()
  @IsNotEmpty({ message: 'login must not be empty' })
  @ApiProperty()
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'password must not be empty' })
  @ApiProperty()
  password: string;
}
