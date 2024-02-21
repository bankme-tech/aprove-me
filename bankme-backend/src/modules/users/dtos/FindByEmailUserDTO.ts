import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class FindByEmailUserQueryDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class FindByEmailUserDataDTO {
  email: string;
}
