import { PartialType } from '@nestjs/mapped-types';

// DTOS
import { CreatePayableDTO } from './create-payable.dto';

export class UpdatePayableDTO extends PartialType(CreatePayableDTO) {}
