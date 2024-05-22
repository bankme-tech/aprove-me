import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthenticateAccountResponseSchema {
  @ApiProperty()
  @Expose()
  accessToken: string;
}
