import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignorDto } from './create-assignor.dto';

export class UpdateAssignorDto extends PartialType(CreateAssignorDto) {}
