import { PartialType } from '@nestjs/swagger';
import { CreatePayableDto } from './create-payable.dto';

export class UpdatePayableDto extends PartialType(CreatePayableDto) {}
