import { PartialType } from '@nestjs/mapped-types';

// DTOS
import { CreateAssignorDTO } from './create-assignor.dto';

export class UpdateAssignorDTO extends PartialType(CreateAssignorDTO) {}
