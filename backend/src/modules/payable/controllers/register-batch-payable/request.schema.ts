import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, ValidateNested } from 'class-validator';
import { RegisterPayableRequestSchema } from '../register-payable/request.schema';

export class RegisterBatchPayableRequestSchema {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(10000)
  @Type(() => RegisterPayableRequestSchema)
  payables: RegisterPayableRequestSchema[];
}
