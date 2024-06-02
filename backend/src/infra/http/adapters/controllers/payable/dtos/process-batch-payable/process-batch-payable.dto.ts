import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RegisterPayableDto } from '../register-payable';

export class ProcessBatchPayableDto {
  @ApiProperty({
    description: 'Array of payables to register',
    type: [RegisterPayableDto],
    example: [
      {
        value: 1000.0,
        assignorId: '1e18b12f-2e42-4bb5-b075-879e99b8c848',
      },
    ],
  })
  @IsArray()
  @ArrayMaxSize(10000, {
    message: 'Batch size exceeds the limit of 10,000 payables.',
  })
  @ValidateNested({ each: true })
  @Type(() => RegisterPayableDto)
  payables: RegisterPayableDto[];
}
