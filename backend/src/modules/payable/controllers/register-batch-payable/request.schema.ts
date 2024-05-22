import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, ValidateNested } from 'class-validator';
import { RegisterPayableRequestSchema } from '../register-payable/request.schema';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterBatchPayableRequestSchema {
  @ApiProperty({ required: true, type: [RegisterPayableRequestSchema] })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(10000)
  @Type(() => RegisterPayableRequestSchema)
  payables: RegisterPayableRequestSchema[];
}
