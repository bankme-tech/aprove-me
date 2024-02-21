import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindUserQueryDTO {
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
}

export class FindUserDataDTO {
  email: string;
  name: string;
}
