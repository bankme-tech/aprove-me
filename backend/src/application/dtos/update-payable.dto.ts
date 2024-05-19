import { PartialType } from '@nestjs/mapped-types';
import { CreatePayableDto } from './create-payable.dto';

export class UpdatePayableDto extends PartialType(CreatePayableDto) {}
