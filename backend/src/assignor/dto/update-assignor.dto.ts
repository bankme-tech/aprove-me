import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignorDto } from '../../assignor/dto/create-assignor.dto';

export class UpdateAssignorDto extends PartialType(CreateAssignorDto) {}
