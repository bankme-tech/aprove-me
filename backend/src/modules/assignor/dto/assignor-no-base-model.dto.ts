import { OmitType } from '@nestjs/swagger';
import { AssignorDto } from './assignor.dto';

export class AssignorNoBaseModelDto extends OmitType(AssignorDto, [
  'id',
] as const) {}

export type AssignorNoBaseModel = Omit<AssignorDto, 'id'>;
