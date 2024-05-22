import { PartialType } from '@nestjs/swagger';
import { CreateAssignorDto } from './create-assignor.dto';

export class UpdateAssignorDto extends PartialType(CreateAssignorDto) {}
