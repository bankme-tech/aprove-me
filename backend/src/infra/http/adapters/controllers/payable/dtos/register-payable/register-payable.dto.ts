import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterPayableDto {
  @ApiProperty({
    description: 'O valor do recebível',
    example: 1000.0,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'O ID do cedente (Assignor)',
    example: '1e18b12f-2e42-4bb5-b075-879e99b8c848',
  })
  @IsNotEmpty()
  @IsString()
  assignor: string;
}
